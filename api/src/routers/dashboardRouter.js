import { Router } from 'express';

import { Donator, Donation, Device, Status } from '../models';

const dashboardRouter = Router();

dashboardRouter.route('/').get(async (req, res) => {
  const status = await Status.findAll({
    include: [
      {
        model: Device,
        as: 'devices',
        include: [
          { model: Donation, as: 'donation' },
          { model: Donator, as: 'donator' }
        ]
      }
    ]
  });

  return res.json(status);
});

export default dashboardRouter;
