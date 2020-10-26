// @ts-ignore
const utils = require('../../lib/utils.ts');

// @ts-ignore
const User = require('../../models/user.model.ts').model('User');

//Importando a controller de User
const UserController = require('../user.controller.ts');

/**
 * Funcao que registra um novo usuario na plataforma.
 *
 * @param request
 * @param response
 * @param next
 */
exports.register = function (request, response, next) {
    UserController.createUser(request, response, next);
}

/**
 * Funcao que loga um usuario na plataforma e gera um token de autorizacao.
 *
 * @param request
 * @param response
 * @param next
 */
exports.login = function (request, response, next) {
    User.find({ email: request.body.email })
        .then((user) => {
            //Se o usuario nao for encontrado, retorna erro 401 Unauthorized
            if(!user[0]) response.status(401).json({ message: "Não foi possível encontrar o usuário." });

            //Verifica se a senha esta correta
            const isValid = utils.verifyPassword(request.body.password, user[0].hash, user[0].salt);

            //Se a senha digitada estiver correta, gera o token e passa o request
            if(isValid) {
                const token = utils.generateJsonWebToken(user[0]);
                response.status(200).json({
                    user: user[0],
                    token: token,
                    message: "Usuário logado com sucesso :)"
                });
            }
            //Caso contrario, retorna erro 401 Unauthorized
            else {
                response.status(401).json({ message: "Voce entrou com a senha incorreta :(" })
            }
        }).catch((err) => next(err));
}
