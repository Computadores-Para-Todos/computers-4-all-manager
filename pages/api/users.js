import { User } from "../../api/src/models";

// Endpoints com api/users
export default async (req, res) => {
  const { method } = req;

  if(method === 'GET'){
    // Obtém lista de usuários
    res.send(await User.findAll({ where: { status: 'active' } }));
  }
  else {
    // method == 'POST' - Cria usuário
    if(req.body) {
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
    }
  }
}