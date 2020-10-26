const Hotel = require('../models/hotel.model.ts');

exports.createHotel = async function (req, res){
	try{
		const data = await Hotel.create({
			name: req.body.name,
			address: {
				city: req.body.city,
				state: req.body.state,
				street: req.body.street,
				number: req.body.number
			},
			rooms: {
				price: req.body.price,
				capacity: req.body.capacity,
				description: req.body.description
			} 
		});
		res.send(data);

	} catch(error){
		res.status(500).json({message: error.message});
	}
}

exports.listAllHotels = async function (req, res){
	try{
		const data = await Hotel.find().populate({path:'ratings', select:['_id', 'rating'],
		populate: {path: '_user', model: 'User', select: 'name'}});
		res.send(data);

	}catch(error){
		res.status(500).json({message: error.message});
	}
}

exports.getHotel = async function(req, res){
	try{
		const data = await Hotel.findById(req.params.id).populate({path:'ratings', select:['_id', 'rating'],
		populate: {path: '_user', model: 'User', select: 'name'}});;
		
		if(!data){
			res.json({message: "Hotel não encontrado"});
		}else{
			res.send(data);
		}

	}catch(error){
		res.status(500).json({message: error.message});
	}
}

exports.deleteHotel = async function(req, res){
	try{
		const data = await Hotel.findByIdAndDelete(req.params.id);
		if(!data){
			res.json({message: "Hotel não encontrado"})
		}else{
			res.json({message: "Hotel deletado com sucesso!"});
		}
	}catch(error){
		res.status(500).json({message: error.message});
	}
}

// Adiciona quarto em um hotel
exports.createRoom = async (req, res) => {
	const newRoom = {
		$push: {
			rooms: [
				{
					price: req.body.price,
					capacity: req.body.capacity,
					description: req.body.description
				}
			]
		}
	};

	try{
		const data = await Hotel.findByIdAndUpdate(req.params.id, newRoom, {new: true});
		return res.send(data);

	}catch(error){
		res.send(500).json({message: error.message});
	}	
}

// Remove quarto de um hotel
exports.deleteRoom = async (req, res) => {
	try{
		const data = await Hotel.findByIdAndUpdate(req.params.hotelId,{
			$pull: { rooms: {_id: req.params.roomId}}
		});
		
		if(!data){
			res.json({message: "Hotel não encontrado"});
		}else{
			res.json({message: "Quarto deletado com sucesso!"});
		}

	}catch(error){
		res.send(500).json({message: error.message});
	}
}


