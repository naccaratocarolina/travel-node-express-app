const { roles } = require('../lib/roles.ts');
const utils = require('../lib/utils.ts');
const User = require('../models/user.model.ts').model('User');

// Pega o token da header
function getToken(request){
    const header = request.get('Authorization');
    if(!header){
        return error;
    }
    else{
        return header.split(' ')[1];
    }
}

// Puxa informações do 'role' do usuário através do token
async function getUserRole(token){
    const userId = utils.userInfo(token);
    const user = await User.findById(userId.sub);
    return user.role;
}

module.exports = function verifyPermissionMiddleware (action, resource) {
    return async (request, response, next) => {
        try {
            // const permission = roles.can(request.body.role)[action](resource);
            const token = getToken(request)
            const userRole = await getUserRole(token);
            const permission = roles.can(userRole)[action](resource);
            
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

export {};