import express from 'express';
import { withAuth, withRole } from '../middlewares';
import { ROLES } from '../settings';
import { User } from '../models';

/**
 * Router de usuário
 */
const userRouter = express.Router();

userRouter
  .route('/')

  // Cria usuário
  .post(withRole(ROLES.ADMIN), async (req, res) =>
    res.json(await User.create(req.body))
  )

  // Obtém lista de usuários
  .get(withRole(ROLES.ADMIN), async (req, res) =>
    res.json(await User.findAll({ where: { status: 'active' } }))
  );

userRouter
  .route('/:id')

  // Obtém usuário por ID
  .get(withRole(ROLES.ADMIN), async ({ params: { id } }, res) => {
    const user = await User.findOne({ where: { id } });
    if (user === null)
      return res.status(404).json({ error: 'Usuário não localizado' });

    res.send(user);
  })

  // Atualiza usuário
  .put(withRole(ROLES.ADMIN), async ({ params: { id }, body }, res) => {
    const usersUpdated = await User.update(body, { where: { id } });
    if (usersUpdated[0] === 0)
      return res.status(404).json({ error: 'Usuário não localizado' });
    res.send(usersUpdated);
  })
  // deleta usuário
  .delete(withRole(ROLES.ADMIN), async ({ params: { id } }, res) =>
    res.json(await User.destroy({ where: { id } }))
  );

export default userRouter;
