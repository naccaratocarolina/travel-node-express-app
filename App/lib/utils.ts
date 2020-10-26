const crypto = require('crypto');
import jsonwebtoken from 'jsonwebtoken';

const fs = require('fs');
const path = require('path');

const pathToKey = path.join(__dirname, '../../', 'id_rsa_priv.pem');

//Usamos chave privada pois queremos decriptar dados
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

/**
 * Funcao que recebe a senha e encripta a mesma, gerando o salt e hash da senha.
 *
 * @param password
 */
function generateHash(password) {
    //O salt eh uma string única, aleatória e arbitrária, que tem pelo menos 16 bytes de comprimento
    const salt = crypto.randomBytes(32).toString('hex');
    //Password-Based Key Derivation Function 2 (PBKDF2)
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return {
        salt: salt,
        hash: hash
    };
}

/**
 * Funcao que recebe uma senha do usuario e compara com a senha registrada desse usuario.
 *
 * @param passwordTyped
 * @param hash
 * @param salt
 */
function verifyPassword(passwordTyped, hash, salt) {
    const hashOfTypedPassword = crypto.pbkdf2Sync(passwordTyped, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashOfTypedPassword;
}

/**
 * Funcao que gera o JsonWebToken, dado um usuario
 * @param user
 */
function generateJsonWebToken(user) {
    const _id = user._id;

    //Payload que a funcao de configuracao do passport jtw vai receber
    const payload = {
        sub: _id,
        iat: Date.now()
    };

    //Gera e retorna o JWT
    return jsonwebtoken.sign(payload, PRIV_KEY, {expiresIn: '7d', algorithm: 'RS256' });
}

module.exports.generateHash = generateHash;
module.exports.verifyPassword = verifyPassword;
module.exports.generateJsonWebToken = generateJsonWebToken;
