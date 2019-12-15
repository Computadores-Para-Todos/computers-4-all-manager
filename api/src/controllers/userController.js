const { User } = require('../models');

class UserController {
  async store(req, res) {
    const { email } = req.body;

    if (await User.findOne({ email })) {
      return res.status(400).json({ error: 'Usuário já cadastrado' });
    }

    const userCreated = await User.create(req.body);
    return res.json(userCreated);
  }

  async index(req, res) {
    const allUsers = await User.findAll({ where: { status: 'active' } });
    return res.json(allUsers);
  }

  async update(req, res) {
    const { id } = req.params;

    const usersUpdated = await User.update(req.body, { where: { id } });

    if (usersUpdated[0] === 0) return res.status(404).json({ error: 'Usuário não localizado' });

    res.json(usersUpdated);
  }

  async findById(req, res) {
    const { id } = req.params;

    const user = await User.findOne({ where: { id } });

    if (user === null) return res.status(404).json({ error: 'Usuário não localizado' });

    res.json(user);
  }

  async delete(req, res) {
    const { id } = req.params;

    const user = await User.destroy({ where: { id } });
    res.json(user);
  }
}

module.exports = new UserController();
