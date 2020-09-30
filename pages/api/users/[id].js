import { User } from "../../../api/src/models";

// Endpoints com api/users/:id
export default (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  if(method === 'GET') {
    // Obtém usuário por ID
    const user = await User.findOne({ where: { id } });
    if (user === null)
      return res.status(404).send({ error: 'Usuário não encontrado' });

    res.send(user);
  }
  else if(method === 'PUT') {
    // Atualiza usuário
    const usersUpdated = await User.update(body, {
      where: { id },
      individualHooks: true
    });

    if (usersUpdated[0] === 0)
      return res.status(404).send({ error: 'Usuário não encontrado' });
    res.send({ updated: true });
  }
  else if(method === 'DELETE') {
    // deleta usuário
    res.send(await User.destroy({ where: { id } }).then(deleted => ({ deleted })))
  }
  else{
    res.setHeader('Allow', ['GET', 'PUT'])
    res.status(405).end(`Method ${method} Not Allowed`)
  }
}