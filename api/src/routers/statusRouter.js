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

  // Obtém lista de status
  .get(async (req, res) => res.send(await Status.findAll()))

  // Cria status
  .post(async (req, res) => res.send(await Status.create(req.body)));

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
