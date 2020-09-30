import { User } from "../../../api/src/models";
import { jwtSign } from "../../../api/src/utils";
import { ROLES } from '..//./../../api/src/settings';
const { JWT_SECRET = 'c4all' } = process.env;

export default async (req, res) => {
  try {
    if(req.body) {
      const { email, password, ...body } = req.body;
      const user = await User.create({ ...body, email, password, role: ROLES.USER });
      const token = await jwtSign(user.toJSON(), JWT_SECRET);

      res.send({
        user: { email, role: user.role },
        token
      }); 
    }
  } catch (err) {
    return res.status(400).json({error: "Erro na Criação do usuário."});
  }
}