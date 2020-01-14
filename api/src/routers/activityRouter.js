import { Router } from 'express';
import { withRole } from '../middlewares';
import { ROLES } from '../settings';
import { Activity } from '../models';

/**
 * Router de atividade
 */
const activityRouter = Router();

// Autorização
activityRouter.use(withRole(ROLES.ADMIN));

activityRouter
  .route('/')

  // Obtém lista de atividades
  .get(async (req, res) => res.send(await Activity.findAll()))

  // Cria atividade
  .post(async ({ body }, res) => res.send(await Activity.create(body)));

activityRouter
  .route('/:id')

  // Obtém atividade por ID
  .get(async ({ params: { id } }, res) => {
    const item = await Activity.findOne({ where: { id } });
    if (item === null)
      return res.status(404).json({ error: 'atividade não encontrada' });

    res.send(item);
  })

  // Atualiza atividade
  .put(async ({ params: { id }, body }, res) => {
    const updated = await Activity.update(body, { where: { id } });
    if (updated[0] === 0)
      return res.status(404).json({ error: 'atividade não encontrada' });
    res.send({ updated: true });
  })
  // deleta atividade
  .delete(async ({ params: { id } }, res) =>
    res.send(
      await Activity.destroy({ where: { id } }).then(deleted => ({ deleted }))
    )
  );

export default activityRouter;
