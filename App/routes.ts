// @ts-ignore
const User = require('./controllers/user.controller.ts');
const Auth = require('./controllers/API/auth.controller.ts');
const authMiddleware = require('./middlewares/auth.middleware.ts');

module.exports = function (router) {
    //Auth Controller
    router.post('/register', Auth.register);
    router.post('/login', Auth.login);

    //User Controller
    router.get('/user', User.listAllUsers);
    router.get('/user/:id', authMiddleware, User.getUser);
    router.post('/user', User.createUser);
    router.put('/user/:id', User.updateUser);
    router.delete('/user/:id', User.deleteUser);
};
