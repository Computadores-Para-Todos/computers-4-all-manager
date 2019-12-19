const { User } = require('../models');
const { jwtSign, encryptCompare } = require('../utils');
const { JWT_SECRET = 'c4all' } = process.env;
const { ROLES } = require('../settings');

class UserController {
  async signUp({ body: { email = '', password = '', ...body } }, res) {
    const user = (await User.create({ ...body, email, password, role: ROLES.USER })).toJSON();
    const token = await jwtSign(user, JWT_SECRET);
    console.log(user);

    res.send({
      user: { email, role: user.role },
      token
    });
  }

  async login({ body: { email = '', password = '' } }, res) {
    const user = await User.findOne({ where: { email: email } });
    if (!user || !encryptCompare(password, user.password))
      return res.status(401).send({ error: 'Login inválido' });

    const token = await jwtSign(user.toJSON(), JWT_SECRET);

    res.send({
      user: { email, role: user.role },
      token
    });
  }

  async whoami({ auth: { email, role } }, res) {
    res.send({
      user: { email, role }
    });
  }

  async store(req, res) {
    const user = await User.create(req.body);
    return res.json(user);
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
