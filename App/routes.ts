//User Controller
const User = require('./controllers/user.controller.ts');

//Auth Controller
const Auth = require('./controllers/API/auth.controller.ts');

//Middlewares
const authMiddleware = require('./middlewares/auth.middleware.ts');
const verifyPermissionMiddleware = require('./middlewares/verifyPermission.middleware.ts');

//Hotel Controller
const Hotel = require('./controllers/hotel.controller.ts');

//Rating Controller
const Rating = require('./controllers/rating.controller.ts');

module.exports = function (router) {
    //Auth Controller
    router.post('/register', Auth.register);
    router.post('/login', Auth.login);

    //User Controller
    router.get('/user', User.listAllUsers);
    router.get('/user/:id', User.getUser);
    router.post('/user', User.createUser);
    router.put('/user/:id', User.updateUser);
    router.delete('/user/:id', User.deleteUser);

    //Hotel Controller
    router.get('/hotel', authMiddleware, verifyPermissionMiddleware('readAny', 'hotel'), Hotel.listAllHotels);
    router.get('/hotel/:id', authMiddleware, Hotel.getHotel);
    router.post('/hotel', authMiddleware, Hotel.createHotel);
    router.delete('/hotel/:id', authMiddleware, Hotel.deleteHotel);

    //Hotel Room
    //Tenho algumas dúvidas sobre quais verbos usar nessas rotas. Eles editam o Hotel, então seriam put mesmo?
    router.put('/hotel/room/:id', authMiddleware, Hotel.createRoom);
    router.put('/hotel/room/:hotelId/:roomId', authMiddleware, Hotel.deleteRoom);

    //Rating Controller
    router.post('/rating', authMiddleware, Rating.createRating);
};

export {};
