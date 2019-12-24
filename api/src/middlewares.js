/**
 *  Middlewares express
 */

import { jwtVerify } from './utils';
import { updateLastAccess } from './controllers/userController';
const { JWT_SECRET = 'c4all' } = process.env;

/**
 * Usado para rotas que precisam do usuário autenticado.
 * @returns {Function} middleware
 */
export function withAuth() {
  return function(req, res, next) {
    let token = req.headers['x-access-token'] || req.headers['authorization'] || '';

    if (token && token.startsWith('Bearer ')) token = token.slice(7, token.length);

    if (!token) return res.status(401).send({ error: 'No Auth' });

    jwtVerify(token, JWT_SECRET)
      .then(decoded => {
        req.auth = decoded;
        next();
      })
      .catch(err => res.status(401).send({ error: err.message }));
  };
}

/**
 * Veririca se usuário autenticado possui a role informada
 * @param {string|[string]} roles uma ou mais roles
 * @returns {[Function]} middleware
 */
export function withRole(roles) {
  if (typeof roles === 'string') roles = [roles];
  return [
    withAuth(),
    function({ auth: { role, ...user } }, res, next) {
      if (!roles.includes(role))
        return res.status(401).send({ error: 'Unauthorized' });
      next();
      updateLastAccess(user);
    }
  ];
}
