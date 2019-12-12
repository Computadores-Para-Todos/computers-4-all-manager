const User = require('../models/usersModel');

class UserController {
  async store(req, res) {
    const { email } = req.body;

    if (await User.findOnde({ email })) {
      return res.status(400).json({ error: 'Usuário já cadastrado' });
    }

    const user = await User.create(req.body);

    return res.json(user);
  }

  async index(req, res) {
    const allUsers = await User.findAll({ where: { status: 'active' } });

    return res.json({ allUsers });
  }
}

module.exports = new UserController();
