import { Router } from 'express';
import { withAuth, withRole } from '../middlewares';
import { ROLES } from '../settings';
import { Device } from '../models';

/**
 * Router de dispositivo
 */
const deviceRouter = Router();

deviceRouter.use(withRole(ROLES.ADMIN));

deviceRouter
  .route('/')

  // Obtém lista de dispositivos
  .get(async (req, res) => res.send(await Device.findAll()))

  // Cria dispositivo
  .post(async ({ body }, res) => res.send(await Device.create(body)));

deviceRouter
  .route('/:id')

  // Obtém dispositivo por ID
  .get(async ({ params: { id } }, res) => {
    const item = await Device.findOne({ where: { id } });
    if (item === null)
      return res.status(404).json({ error: 'dispositivo não encontrado' });

    res.send(item);
  })

  // Atualiza dispositivo
  .put(async ({ params: { id }, body }, res) => {
    const updated = await Device.update(body, { where: { id } });
    if (updated[0] === 0)
      return res.status(404).json({ error: 'dispositivo não encontrado' });
    res.send({ updated: true });
  })
  // deleta dispositivo
  .delete(async ({ params: { id } }, res) =>
    res.send(await Device.destroy({ where: { id } }).then(deleted => ({ deleted })))
  );

export default deviceRouter;
