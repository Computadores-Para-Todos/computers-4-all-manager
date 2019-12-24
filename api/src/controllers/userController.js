const { User } = require('../models');
const { Op } = require('sequelize');

class UserController {
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

    if (usersUpdated[0] === 0)
      return res.status(404).json({ error: 'Usuário não localizado' });

    res.json(usersUpdated);
  }

  async findById(req, res) {
    const { id } = req.params;

    const user = await User.findOne({ where: { id } });

    if (user === null)
      return res.status(404).json({ error: 'Usuário não localizado' });

    res.json(user);
  }

  async delete(req, res) {
    const { id } = req.params;

    const user = await User.destroy({ where: { id } });
    res.json(user);
  }

  /**
   * Atualiza a data do último acesso
   * @param {object} { id } usuário
   * @returns {Promise} query
   * @memberof UserController
   */
  async updateLastAccess({ id }) {
    // data de hoje, às 0H
    const now = new Date();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);

    console.log('lastaccess');
    return await User.update(
      { lastaccess: new Date() },
      {
        where: {
          id,
          [Op.or]: [
            { lastaccess: { [Op.lt]: now } },
            { lastaccess: { [Op.eq]: null } }
          ]
        }
      }
    );
  }
}

module.exports = new UserController();
