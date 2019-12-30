import { Router } from 'express';
import { withAuth, withRole } from '../middlewares';
import { ROLES } from '../settings';
import { Status } from '../models';

/**
 * Router de usuário
 */
const statusRouter = Router();

statusRouter.use(withRole(ROLES.ADMIN));

statusRouter
  .route('/')

  // Cria status
  .post(async (req, res) => res.json(await Status.create(req.body)))

  // Obtém lista de status
  .get(async (req, res) => res.json(await Status.findAll()));

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
    res.send(statusUpdated);
  })
  // deleta status
  .delete(async ({ params: { id } }, res) =>
    res.json(await Status.destroy({ where: { id } }))
  );

export default statusRouter;
