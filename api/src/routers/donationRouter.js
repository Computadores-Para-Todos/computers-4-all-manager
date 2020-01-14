import { Router } from 'express';

import { Donator, Donation, Device, Status } from '../models';

const donationRouter = Router();

donationRouter
  .route('/')

  // Cria uma nova doação passando os dados do doador
  .post(async (req, res) => {
    const { donator: reqDonator } = req.body;
    if (reqDonator) {
      const { document } = reqDonator;
      if (!document)
        return res.status(400).json({ error: 'Documento não pode ser nulo' });

      let donator = await Donator.findOne({ where: { document } });

      if (!donator) {
        donator = await Donator.create(reqDonator);
      } else {
        donator = await donator.update(reqDonator);
      }

      const donation = await Donation.create({ donatorId: donator.id });
      await donation.reload({
        include: [{ model: Donator, as: 'donator' }]
      });

      return res.json(donation);
    }
    return res.status(400).json({ error: 'Doador não deve ser nulo' });
  });

donationRouter
  .route('/:donationId')

  // Atualiza os dados da doação
  .put(async (req, res) => {
    const { donationId } = req.params;

    const donation = await Donation.findOne({
      where: { id: donationId }
    });
    if (!donation) {
      return res.status(400).json({ error: 'Identificador inválido' });
    }

    // Segunda etapa do formulário
    const { quantity, devices, description } = req.body;
    if (quantity) {
      if (quantity === 1) {
        if (!devices || (devices && devices.length < 1)) {
          return res
            .status(400)
            .json({ error: 'O dispositivo deve ser especificado' });
        }
        await Promise.all(
          devices
            .filter(device => !device.id)
            .map(device =>
              Device.create(
                {
                  donationId: donation.id,
                  donatorId: donation.donatorId,
                  status: {
                    title: 'Submetido ao sistema pelo doador',
                    use: 'device'
                  },
                  ...device
                },
                {
                  include: [
                    {
                      model: Status,
                      as: 'status'
                    }
                  ]
                }
              )
            )
        );
      } else {
        if (!description) {
          return res
            .status(400)
            .json({ error: 'O conjunto de dispositivos deve ter descrição' });
        }
        await donation
          .set('description', description)
          .set('quantity', quantity)
          .save();
      }
    }

    // Terceira etapa do formulário
    const { collect, donator: reqDonator } = req.body;
    if (collect) {
      if (collect.type === 'fetch') {
        if (!collect.time || collect.time === '') {
          return res
            .status(400)
            .json({ error: 'Um horário para para busca deve ser definido' });
        }
        if (
          !reqDonator ||
          !reqDonator.address_line_1 ||
          !reqDonator.address_city ||
          !reqDonator.address_state ||
          !reqDonator.address_country
        ) {
          return res.status(400).json({ error: 'Endereço para busca inválido' });
        }
      }

      await Promise.all([
        donation.update({
          collect_type: collect.type,
          collect_time: collect.time
        }),
        Donator.update(
          {
            ...reqDonator
          },
          {
            where: { id: donation.donatorId }
          }
        )
      ]);
    }

    const {
      donator,
      devices: donationDevices,
      collect_time,
      collect_type,
      statusId: status_id
    } = await Donation.findOne({
      where: {
        id: donation.id
      },
      include: [
        {
          model: Donator,
          as: 'donator'
        },
        {
          model: Device,
          as: 'devices'
        }
      ]
    });

    return res.json({
      donator_id: donator.id,
      donator,
      quantity,
      description,
      devices: donationDevices,
      collect: {
        type: collect_type,
        time: collect_time
      },
      status_id
    });
  });

export default donationRouter;
