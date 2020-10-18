const User = require('./controllers/user.controller.ts');

module.exports = function (router) {
    //User Controller
    router.get('/user', User.listAllUsers);
    router.get('/user/:id', User.getUser);
    router.post('/user', User.createUser);
    router.put('/user/:id', User.updateUser);
    router.delete('/user/:id', User.deleteUser);
};