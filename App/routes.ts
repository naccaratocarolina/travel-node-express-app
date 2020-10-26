// @ts-ignore
const User = require('./controllers/user.controller.ts');

const Auth = require('./controllers/API/auth.controller.ts');
const authMiddleware = require('./middlewares/auth.middleware.ts');

const Hotel = require('./controllers/hotel.controller.ts');
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

    //Hotel
    router.get('/hotel', authMiddleware, Hotel.listAllHotels);
    router.get('/hotel/:id', authMiddleware, Hotel.getHotel);
    router.post('/hotel', authMiddleware, Hotel.createHotel);
    router.delete('/hotel/:id', authMiddleware, Hotel.deleteHotel);

    //Hotel Room
    //Tenho algumas dúvidas sobre quais verbos usar nessas rotas. Eles editam o Hotel, então seriam put mesmo?
    router.put('/hotel/room/:id', authMiddleware, Hotel.createRoom);
    router.put('/hotel/room/:hotelId/:roomId', authMiddleware, Hotel.deleteRoom);

    //Rating
    router.post('/rating', authMiddleware, Rating.createRating);
};

export {};
