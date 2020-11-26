const Rating = require('../models/rating.model.ts');
const Hotel = require('../models/hotel.model.ts');
const User = require('../models/user.model.ts');
const utils = require('../lib/utils.ts');

exports.createRating = async function(req, res){
	try{

		let headerToken = req.get('Authorization');

		if(!headerToken){
			res.status(401).json({message: "O usário não está logado"});
		}else{
			headerToken = headerToken.split(' ')[1];
			var userId = utils.userInfo(headerToken).sub;
		}
		
		const data = await Rating.create({
			_user: userId,
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

exports.updateRating = async function (req, res){
	try{

		let headerToken = req.get('Authorization');
	
		if(!headerToken){
			res.status(401).json({message: "O usário não está logado"});
		}else{
			headerToken = headerToken.split(' ')[1];
			var userId = utils.userInfo(headerToken).sub;
		}

		const ratingInfo = await Rating.findById(req.params.id);
		
		if(ratingInfo._user == userId){
			const data = await Rating.findByIdAndUpdate(req.params.id, {rating: req.body.rating}, {new: true});
			res.send(data);
		}else{
			res.status(401).json({message: "Não é possível editar a avaliação de outra pessoa"})
		}

	}catch(error){
		res.status(500).json({message: error.message});
	}
}

exports.deleteRating = async function (req, res){
	try{

		let headerToken = req.get('Authorization');
	
		if(!headerToken){
			res.status(401).json({message: "O usário não está logado"});
		}else{
			headerToken = headerToken.split(' ')[1];
			var userId = utils.userInfo(headerToken).sub;
		}

		const ratingInfo = await Rating.findById(req.params.id);
		if(ratingInfo._user == userId){
			await Rating.findByIdAndDelete(req.params.id);
			res.send({message: "Avaliação deletada com sucesso"})
		}else{
			res.status(401).json({message: "Não é possível deletar a avaliação de outra pessoa"})
		}

	}catch(error){
		res.status(500).json({message: error.message});
	}
}

export {};