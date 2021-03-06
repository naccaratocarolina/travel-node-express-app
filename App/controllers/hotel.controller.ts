const Hotel = require('../models/hotel.model.ts');

exports.createHotel = async function (req, res){
	try{
		// res.send(req.file.path);
		// return;
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
			},
			image: req.file.path 
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
		if(data.length == 0){
			res.status(404).json({message:"Ainda não existem hoteis cadastrados."});
		}else{
			res.send(data);
		}

	}catch(error){
		res.status(500).json({message: error.message});
	}
}

exports.getHotel = async function(req, res){
	try{
		const data = await Hotel.findById(req.params.id).populate({path:'ratings', select:['_id', 'rating'],
		populate: {path: '_user', model: 'User', select: 'name'}});;
		
		if(!data){
			res.status(404).json({message: "Hotel não encontrado"});
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
			res.status(404).json({message: "Hotel não encontrado"})
		}else{
			res.json({message: "Hotel deletado com sucesso!"});
		}
	}catch(error){
		res.status(500).json({message: error.message});
	}
}

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
		const data = await Hotel.findByIdAndUpdate(req.params.hotelId, newRoom, {new: true});
		return res.send(data);

	}catch(error){
		res.send(500).json({message: error.message});
	}	
}

exports.deleteRoom = async (req, res) => {
	try{
		const data = await Hotel.findByIdAndUpdate(req.params.hotelId,{
			$pull: { rooms: {_id: req.params.roomId}}
		});
		
		if(!data){
			res.status(404).json({message: "Hotel não encontrado"});
		}else{
			res.json({message: "Quarto deletado com sucesso!"});
		}

	}catch(error){
		res.send(500).json({message: error.message});
	}
}
