const { roles } = require('../lib/roles.ts');

module.exports = function grantAccessMiddleware (action, resource) {
    return async (request, response, next) => {
        try {
            const permission = roles.can(request.body.role)[action](resource);

            //Se o usuario nao tiver permissao, retorna Unauthorized 401
            if(!permission.granted) {
                return response.sendStatus(401);
            }

            //Se chegar ate aqui, ta tudo certo, prossegue com o request
            return next();
        } catch (error) {
            //Pega eventuais erros
            return next(error);
        }
    }
}
