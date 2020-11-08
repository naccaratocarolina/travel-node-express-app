//Main Controllers
const User = require('./controllers/user.controller.ts');
const Hotel = require('./controllers/hotel.controller.ts');
const Rating = require('./controllers/rating.controller.ts');
const Booking = require('./controllers/booking.controller.ts');

//Auth Controller
const Auth = require('./controllers/API/auth.controller.ts');

//Middlewares
const authMiddleware = require('./middlewares/auth.middleware.ts');
const verifyPermissionMiddleware = require('./middlewares/verifyPermission.middleware.ts');

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
    router.get('/hotel/:id', Hotel.getHotel);
    router.post('/hotel', Hotel.createHotel);
    router.delete('/hotel/:id', authMiddleware, Hotel.deleteHotel);
        //Room
        router.post('/hotel/:hotelId/room', Hotel.createRoom);
        router.delete('/hotel/:hotelId/room/:roomId', authMiddleware, Hotel.deleteRoom);

    //Booking Controller
    router.get('/hotel/room/booking', Booking.getBookings); 
    router.get('/hotel/room/booking/available', Booking.getAvailableRooms);
    router.post('/hotel/room/booking', Booking.createBooking);
    router.put('/hotel/room/booking/:id', Booking.updateBooking);
    router.delete('/hotel/room/booking/:id', Booking.deleteBooking);

    //Rating Controller
    router.post('/rating', Rating.createRating);
    router.put('/rating/:id', Rating.updateRating);
    router.delete('/rating/:id', Rating.deleteRating);
};

export {};
