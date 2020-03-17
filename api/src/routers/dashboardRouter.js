import { Router } from 'express';

import { Donator, Donation, Device, Status } from '../models';

const dashboardRouter = Router();

dashboardRouter.route('/').get(async (req, res) => {
  // const status = await Status.get();

  return res.json({
    devices_status: [
      {
        id: 1,
        title: 'Conferir',
        devices: [
          { id: 1, title: 'Notebook XPTO', donator_name: 'Matheus' },
          { id: 2, title: 'PC 2', donator_name: 'Tiago Gouvêa' }
        ]
      },
      {
        id: 2,
        title: 'Renovando',
        devices: [
          { id: 3, title: 'Notebook José', donator_name: 'José' },
          { id: 4, title: 'PC 4', donator_name: 'Marcos' }
        ]
      }
    ]
  });
});

export default dashboardRouter;
