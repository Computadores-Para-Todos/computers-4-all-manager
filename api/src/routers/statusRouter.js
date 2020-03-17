import { Router } from 'express';
import { withRole } from '../middlewares';
import { ROLES } from '../settings';
import { Status, Device, Donator, Comment } from '../models';

/**
 * Router de usuário
 */
const statusRouter = Router();

// Autorização
statusRouter.use(withRole(ROLES.ADMIN));

statusRouter
  .route('/')

  // Obtém lista de status
  .get(async (req, res) => res.send(await Status.findAll()))

  // Cria status
  .post(async (req, res) => res.send(await Status.create(req.body)));

statusRouter
  .route('/list')

  // Lista os estatus e os dispositivos associados
  .get(async (req, res) => {
    const statusList = await Status.findAll({
      where: {
        showOnGrid: true
      },
      order: [['displayOrder', 'ASC']],
      include: [
        {
          model: Device,
          as: 'devices',
          include: [
            {
              model: Donator,
              as: 'donator',
              attributes: ['name']
            },
            {
              model: Comment,
              as: 'comments'
            }
          ]
        }
      ]
    });

    return res.json(statusList);
  });

statusRouter
  .route('/:id')

  // Obtém status por ID
  .get(async ({ params: { id } }, res) => {
    const status = await Status.findOne({ where: { id } });
    if (status === null)
      return res.status(404).send({ error: 'Status não encontrado' });

    res.send(status);
  })

  // Atualiza status
  .put(async ({ params: { id }, body }, res) => {
    const statusUpdated = await Status.update(body, { where: { id } });
    if (statusUpdated[0] === 0)
      return res.status(404).send({ error: 'Status não encontrado' });
    res.send({ updated: true });
  })
  // deleta status
  .delete(async ({ params: { id } }, res) =>
    res.send(await Status.destroy({ where: { id } }).then(deleted => ({ deleted })))
  );

export default statusRouter;
