import jsonwebtoken from 'jsonwebtoken';

const fs = require('fs');
const path = require('path');

const pathToKey = path.join(__dirname, '../../', 'id_rsa_pub.pem');

//Usamos a chave publica pois queremos verificar uma entidade decriptando dados encriptografados
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

module.exports = function authMiddleware (request, response, next) {
    try {
        //Extrai a header de autorizacao do request, que eh uma string na forma Bearer <TOKEN>
        const authHeader = request.headers.authorization;
        //Salva o token em uma variavel
        const token = authHeader.split(" ")[1];

        //Decodifica o token
        jsonwebtoken.verify(token, PUB_KEY, {algorithm: 'RS256' }, (err) => {
            //Se um erro for encontrado, retorna Unauthorized error 401
            if (err) return response.sendStatus(401).json({ message: "Voce nao tem permissao!" });
            //Se tudo estiver ok, passa o request
            return next();
        });
    } catch {
        //Se o request nao possuir a header de autorizacao
        response.sendStatus(401);
    }
}
