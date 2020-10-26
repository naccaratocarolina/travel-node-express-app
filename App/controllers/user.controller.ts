// @ts-ignore
const User = require('../models/user.model.ts').model('User');
// @ts-ignore
const utils = require('../lib/utils.ts');

/**
 * List all users.
 *
 * @param request
 * @param response
 * @param next
 */
exports.listAllUsers = function (request, response, next) {
    //quando a query nao eh especificada, retorna todos os objetos
    
    //O populate puxa as informações de ratings da model de Rating. Dentro da model de Rating podemos puxar as informações sobre o Hotel através de outro populate
    User.find({}).populate({path: 'ratings', select: ['_hotel', 'rating'], 
    populate: {path: '_hotel', model: 'Hotel', select: 'name'}}).exec(function (err, users) {
        if(err) {
            response.json({
                error: err,
                message: "Algo deu errado :("
            });
        }

        if(!users) {
            response.json({
                message: "Não existe nenhum usuário registrado ainda."
            });
            return next(new Error("Não existe nenhum usuário ainda."));
        }

        response.json({
            users: users,
            message: "Usuários listados com sucesso!"
        });
    });
}

/**
 * Get an user by its id.
 *
 * @param request
 * @param response
 * @param next
 */
exports.getUser = function (request, response, next) {
    User.findById(request.params.id, function (err, user) {
        if(err) {
            response.json({
                error: err,
                message: "Algo deu errado :("
            });
            return next(err);
        }

        if(!user) {
            response.json({
                message: "Usuário não encontrado"
            });
            return next(new Error("Usuário não encontrado: " + user));
        }

        response.json({
            message: "Usuário encontrado com sucesso!"
        });
    });
}

/**
 * Create a new User.
 *
 * @param request
 * @param response
 */
exports.createUser = function (request, response, next) {
    const generateHash = utils.generateHash(request.body.password);
    const salt = generateHash.salt;
    const hash = generateHash.hash;

    var newUser = new User ({
        name: request.body.name,
        email: request.body.email,
        salt: salt,
        hash: hash,
        role: request.body.role
    });

    newUser.save(newUser, function (err, newUser) {
        if(err) {
            response.json({
                error: err,
                message: "Algo deu errado :("
            });
            return next(err);
        }

        response.json({
            user: newUser,
            message: "Usuário criado com sucesso!"
        });
    });
}

/**
 * Update an user by its id.
 *
 * @param request
 * @param response
 */
exports.updateUser = function (request, response, next) {
    var userUpdateData = {
        name: request.body.name,
        email: request.body.email,
        password: request.body.password
    }

    User.findOneAndUpdate(request.params.id, userUpdateData, function (err, updatedUser) {
        if(err) {
            response.json({
                error: err,
                message: "Algo deu errado :("
            });
            return next(err);
        }

        if(!updatedUser) {
            response.json({
                message: "Usuário não encontrado"
            });
            return next(new Error("Usuário não encontrado: " + updatedUser));
        }

        response.json({
            user: updatedUser,
            message: "Usuário atualizado com sucesso!"
        });
    });
}

/**
 * Delete a usar by its id.
 *
 * @param request
 * @param response
 */
exports.deleteUser = function (request, response, next) {
    User.findOneAndDelete(request.params.id, function (err, deletedUser) {
        if(err) {
            response.json({
                error: err,
                message: "Algo deu errado :("
            });
            return next(err);
        }

        if(!deletedUser) {
            response.json({
                message: "Usuário não encontrado"
            });
            return next(new Error("Usuário não encontrado: " + deletedUser));
        }

        response.json({
            user: deletedUser,
            message: "Usuário deletado com sucesso!"
        })
    });
}
