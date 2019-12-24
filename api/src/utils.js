import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

/**
 * Encripta valor para uso no banco de dados
 * @param {*} value valor a ser encriptado
 * @returns {string} valor encriptado
 */
export function encrypt(value) {
  return bcrypt.hashSync(value, 10);
}

/**
 * Compara dois valores criptografados
 * @param {string} plain plain value
 * @param {string} hash  hash value
 * @returns {boolean} são iguais
 */
export function encryptCompare(plain, hash) {
  return bcrypt.compareSync(plain, hash);
}

/**
 * Transforms an callback function to a promise, allowing use of async/await
 * @param {Function} fn function to transform
 * @returns {Function} transformed function
 */
export function promisefy(fn) {
  return (...args) =>
    new Promise((resolve, reject) =>
      fn(...args, (err, data) => (err ? reject(err) : resolve(data)))
    );
}

/**
 * Transforma retorno da promise em tupla de sucesso e erro
 * @param {Promise} promise
 * @returns {[*, Error]} Dados
 */
export function cathPromise(promise) {
  return promise.then(value => [value, null]).catch(error => [null, error]);
}

export const jwtSign = promisefy(jwt.sign);

export const jwtVerify = promisefy(jwt.verify);
