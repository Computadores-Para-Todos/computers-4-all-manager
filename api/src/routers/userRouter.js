import { Router } from 'express';
import { withRole } from '../middlewares';
import { ROLES } from '../settings';
import { User } from '../models';

/**
 * Router de usuário
 */
const userRouter = Router();

// Autorização
userRouter.use(withRole(ROLES.ADMIN));

userRouter
  .route('/')

  // Obtém lista de usuários
  .get(async (req, res) =>
    res.send(await User.findAll({ where: { status: 'active' } }))
  )

  // Cria usuário
  .post(async (req, res) => {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ error: 'Senha obrigatória' });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: 'A senha deve conter no mínimo 6 caracteres' });
    }
    res.send(await User.create(req.body));
  });

userRouter
  .route('/:id')

  // Obtém usuário por ID
  .get(async ({ params: { id } }, res) => {
    const user = await User.findOne({ where: { id } });
    if (user === null)
      return res.status(404).send({ error: 'Usuário não encontrado' });

    res.send(user);
  })

  // Atualiza usuário
  .put(async ({ params: { id }, body }, res) => {
    const usersUpdated = await User.update(body, {
      where: { id },
      individualHooks: true
    });
    if (usersUpdated[0] === 0)
      return res.status(404).send({ error: 'Usuário não encontrado' });
    res.send({ updated: true });
  })
  // deleta usuário
  .delete(async ({ params: { id } }, res) =>
    res.send(await User.destroy({ where: { id } }).then(deleted => ({ deleted })))
  );

export default userRouter;
