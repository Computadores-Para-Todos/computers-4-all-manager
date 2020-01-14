import app from '../../src/app';
import supertest from 'supertest';
const request = supertest(app);

import { Donator, Donation, sequelize } from '../../src/models';
import truncate from '../util/truncate';

describe('Rota POST /donation', () => {
  beforeAll(async () => {
    await sequelize.sync();
  });

  beforeEach(async () => {
    await truncate();
  });

  it('Deveria recusar donator nulo', async done => {
    const res = await request.post('/api/donations');
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Doador não deve ser nulo');

    done();
  });

  it('Deveria criar uma nova entrada de doação', async done => {
    const res = await request
      .post('/api/donations')
      .send({ donator: { document: '123456789', name: 'aaa', type: 'person' } });

    expect(res.status).toBe(200);
    expect(res.body.id).not.toBeNull();
    expect(res.body.donatorId).not.toBeNull();

    done();
  });

  it('Deveria atualizar o doador se este já estiver cadastrado', async done => {
    const donator = await Donator.create({
      document: '41522357156',
      name: 'John Smith',
      type: 'person'
    });

    const res = await request.post('/api/donations').send({
      donator: {
        document: '41522357156',
        name: 'John Poe',
        email: 'umemail@example.com'
      }
    });

    expect(res.status).toBe(200);
    expect(res.body.id).not.toBeNull();
    expect(res.body.donatorId).toBe(donator.id);
    expect(res.body.donator.name).toBe('John Poe');

    done();
  });
});

describe('Rota PUT /donation/:id', () => {
  beforeAll(async () => {
    await sequelize.sync();
  });

  beforeEach(async () => {
    await truncate();
  });

  it('Deveria atualizar uma doação existente com quantidade e descrição', async done => {
    const donator = await Donator.create({
      document: '41522357156',
      name: 'John Smith',
      type: 'person'
    });
    const donation = await Donation.create({ donatorId: donator.id });
    const res = await request.put(`/api/donations/${donation.id}`).send({
      quantity: 2,
      description: 'Dois notebooks'
    });

    expect(res.status).toBe(200);
    expect(res.body.description).toBe('Dois notebooks');

    done();
  });

  it('Deveria recusar quantidade maior que um sem uma descrição', async done => {
    const donator = await Donator.create({
      document: '41522357156',
      name: 'John Smith',
      type: 'person'
    });
    const donation = await Donation.create({ donatorId: donator.id });
    const res = await request.put(`/api/donations/${donation.id}`).send({
      quantity: 2
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('O conjunto de dispositivos deve ter descrição');

    done();
  });

  it('Deveria atualizar uma doação existente com quantidade "1" e um device', async done => {
    const donator = await Donator.create({
      document: '41522357156',
      name: 'John Smith',
      type: 'person'
    });
    const donation = await Donation.create({ donatorId: donator.id });
    const res = await request.put(`/api/donations/${donation.id}`).send({
      quantity: 1,
      devices: [
        {
          title: 'Notebook',
          type: 'computer'
        }
      ]
    });

    expect(res.status).toBe(200);
    expect(res.body.devices.length).toBe(1);
    expect(res.body.devices[0].donatorId).toBe(donator.id);

    return done();
  });

  it('Deveria manter device com id inalterado', async done => {
    const donator = await Donator.create({
      document: '41522357156',
      name: 'John Smith',
      type: 'person'
    });
    const donation = await Donation.create({ donatorId: donator.id });
    const firstResponse = await request.put(`/api/donations/${donation.id}`).send({
      quantity: 1,
      devices: [
        {
          title: 'Notebook',
          type: 'computer'
        }
      ]
    });
    const secondResponse = await request.put(`/api/donations/${donation.id}`).send({
      quantity: 1,
      devices: [
        {
          id: firstResponse.body.devices[0].id,
          title: 'Impressora',
          type: 'printer'
        }
      ]
    });

    expect(secondResponse.status).toBe(200);
    expect(secondResponse.body.devices.length).toBe(1);
    expect(secondResponse.body.devices[0].title).toBe('Notebook');
    expect(secondResponse.body.devices[0].type).toBe('computer');

    return done();
  });

  it('Deveria recusar quantidade um sem devices', async done => {
    const donator = await Donator.create({
      document: '41522357156',
      name: 'John Smith',
      type: 'person'
    });
    const donation = await Donation.create({ donatorId: donator.id });
    const res = await request.put(`/api/donations/${donation.id}`).send({
      quantity: 1
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('O dispositivo deve ser especificado');

    done();
  });

  it('Deveria atualizar uma doação existente com collect', async done => {
    const donator = await Donator.create({
      document: '41522357156',
      name: 'John Smith',
      type: 'person'
    });
    const donation = await Donation.create({ donatorId: donator.id });
    const res = await request.put(`/api/donations/${donation.id}`).send({
      collect: {
        type: 'fetch',
        time: 'Amanhã de manhã'
      },
      donator: {
        address_line_1: 'Rua de Teste',
        address_city: 'Juiz de Fora',
        address_state: 'Minas Gerais',
        address_country: 'Brazil'
      }
    });

    expect(res.status).toBe(200);
    expect(res.body.collect.type).toBe('fetch');
    expect(res.body.collect.time).toBe('Amanhã de manhã');

    done();
  });

  it('Deveria recusar "collect" sem "time"', async done => {
    const donator = await Donator.create({
      document: '41522357156',
      name: 'John Smith',
      type: 'person'
    });
    const donation = await Donation.create({ donatorId: donator.id });
    const res = await request.put(`/api/donations/${donation.id}`).send({
      collect: {
        type: 'fetch'
      },
      donator: {
        address_city: 'Juiz de Fora',
        address_state: 'Minas Gerais',
        address_country: 'Brazil'
      }
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Um horário para para busca deve ser definido');

    done();
  });

  it('Deveria recusar "collect" com endereço mal formado', async done => {
    const donator = await Donator.create({
      document: '41522357156',
      name: 'John Smith',
      type: 'person'
    });
    const donation = await Donation.create({ donatorId: donator.id });
    const res = await request.put(`/api/donations/${donation.id}`).send({
      collect: {
        type: 'fetch',
        time: 'Amanhã de manhã'
      },
      donator: {
        address_city: 'Juiz de Fora',
        address_state: 'Minas Gerais',
        address_country: 'Brazil'
      }
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Endereço para busca inválido');

    done();
  });
});
