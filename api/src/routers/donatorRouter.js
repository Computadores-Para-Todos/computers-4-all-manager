import { Router } from 'express';
import { withRole } from '../middlewares';
import { ROLES } from '../settings';
import { Donator } from '../models';

/**
 * Router de doador
 */
const donatorRouter = Router();

// Autorização
donatorRouter.use(withRole(ROLES.ADMIN));

donatorRouter
  .route('/')

  // Obtém lista de doadores
  .get(async (req, res) => res.send(await Donator.findAll()))

  // Cria doador
  .post(async ({ body }, res) => res.send(await Donator.create(body)));

donatorRouter
  .route('/:id')

  // Obtém doador por ID
  .get(async ({ params: { id } }, res) => {
    const donator = await Donator.findOne({ where: { id } });
    if (donator === null)
      return res.status(404).json({ error: 'doador não encontrado' });

    res.send(donator);
  })

  // Atualiza doador
  .put(async ({ params: { id }, body }, res) => {
    const donatorsUpdated = await Donator.update(body, { where: { id } });
    if (donatorsUpdated[0] === 0)
      return res.status(404).json({ error: 'doador não encontrado' });
    res.send({ updated: true });
  })
  // deleta doador
  .delete(async ({ params: { id } }, res) =>
    res.send(await Donator.destroy({ where: { id } }).then(deleted => ({ deleted })))
  );

export default donatorRouter;
