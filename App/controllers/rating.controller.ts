const Rating = require('../models/rating.model.ts');
const Hotel = require('../models/hotel.model.ts');
const User = require('../models/user.model.ts');

exports.createRating = async function(req, res){
	try{
		const data = await Rating.create({
			_user: req.body.user,
			_hotel: req.body.hotel,
			rating: req.body.rating
		});

		//Adiciona referência de Rating ao hotel associado
		const hotelData = await Hotel.findByIdAndUpdate(data._hotel, {$push: {ratings: data._id}});

		//Adiciona referência de Rating ao usuário associado
		const userData = await User.findByIdAndUpdate(data._user, {$push: {ratings: data._id}});

		res.send(data);

	}catch(error){
		res.status(500).json({message: error.message});
	}
}

export {};