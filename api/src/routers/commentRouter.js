import { Router } from 'express';
import { withRole } from '../middlewares';
import { ROLES } from '../settings';
import { Comment } from '../models';

/**
 * Router de comentário
 */
const commentRouter = Router();

// Autorização
commentRouter.use(withRole(ROLES.ADMIN));

commentRouter
  .route('/')

  // Obtém lista de comentários
  .get(async (req, res) => res.send(await Comment.findAll()))

  // Cria comentário
  .post(async ({ body }, res) => res.send(await Comment.create(body)));

commentRouter
  .route('/:id')

  // Obtém comentário por ID
  .get(async ({ params: { id } }, res) => {
    const item = await Comment.findOne({ where: { id } });
    if (item === null)
      return res.status(404).json({ error: 'comentário não encontrado' });

    res.send(item);
  })

  // Atualiza comentário
  .put(async ({ params: { id }, body }, res) => {
    const updated = await Comment.update(body, { where: { id } });
    if (updated[0] === 0)
      return res.status(404).json({ error: 'comentário não encontrado' });
    res.send({ updated: true });
  })
  // deleta comentário
  .delete(async ({ params: { id } }, res) =>
    res.send(await Comment.destroy({ where: { id } }).then(deleted => ({ deleted })))
  );

export default commentRouter;
