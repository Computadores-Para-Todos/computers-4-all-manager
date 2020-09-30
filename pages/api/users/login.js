import { User } from "../../../api/src/models";
import { encryptCompare, jwtSign } from "../../../api/src/utils";
const { JWT_SECRET = 'c4all' } = process.env;

export default async (req, res) => {
  if(req.body){
    const { email, password } = req.body
    
    const user = await User.findOne({ where: { email: email } });
    if (!user || !encryptCompare(password, user.password_hash)){
      return res.status(401).json({error: "Login Inválido"});
    }
    const token = await jwtSign(user.toJSON(), JWT_SECRET);

    res.send({
      user: { email, role: user.role },
      token
    });
  }
}