const Booking = require('../models/booking.model.ts');
const Hotel = require('../models/hotel.model.ts');

async function getConflictingBookings(startDate, endDate){
	return await Booking.find()
	.where('startDate').lt(endDate)
	.where('endDate').gt(startDate)
	.exec();
}

exports.createBooking = async function (req, res) {
	try{
		const conflictingBookings = await Booking.find({roomId: req.body.roomId})
		.where('startDate').lt(req.body.endDate)
		.where('endDate').gt(req.body.startDate)
		.exec();

		if(conflictingBookings.length != 0){
			res.status(403).json({message: "Não foi possível agendar o quarto nesta data"})
		}else{
			const data = await Booking.create({
				hotelId: req.body.hotelId,
				roomId: req.body.roomId,
				startDate: req.body.startDate,
				endDate: req.body.endDate
			});
			res.send(data);
		}
	} catch(error){
		res.status(500).json({message: error.message});
	}
}

exports.getBookings = async function(req, res){
	try{
		const data = await Booking.find();
		if(data.length == 0){
			res.status(404).json({message:"Ainda não existem agendamentos"});
		}else{
			res.send(data);
		}
	}catch(error){
		res.status(500).json({message: error.message});
	}
}

exports.updateBooking = async function (req, res){
	try{
		const conflictingBookings = await Booking.find()
		.where('startDate').lt(req.body.endDate)
		.where('endDate').gt(req.body.startDate)
		.exec();

		if(conflictingBookings.length != 0){
			res.status(403).json({message: "Não foi possível agendar o quarto nesta data"})
		}else{
			const data = await Booking.findByIdAndUpdate(req.params.id,
				{startDate: req.body.startDate,
				endDate: req.body.endDate},
				{new: true});

			res.send(data);
		}
	} catch(error){
		res.status(500).json({message: error.message});
	}
}

exports.deleteBooking = async function (req, res){
	try{
		const data = await Booking.findByIdAndDelete(req.params.id);
		if(!data){
			res.status(404).json({message: "Agendamento não encontra"})
		}else{
			res.json({message: "Agendamento deletado com sucesso!"});
		}
	}catch(error){
		res.status(500).json({message: error.message});
	}
}

exports.getAvailableRooms = async function (req, res){
	try{
		// Array de objetos com as ids dos quartos indisponíveis 
		const conflictingBookings = await getConflictingBookings(req.body.startDate,req.body.endDate);
		// Transforma o array de objetos em um array simples com as ids dos quartos conflitantes
		let arrayConflictingIds = await conflictingBookings.map(function (obj) {
			return obj.roomId;
		})

		// O operador $nin filtra os elementos daquele campo a partir de um array
		const data = await Hotel.find(
			{'rooms.price': {$gt: 0},
			'rooms.capacity': {$gt: 5},
			'rooms._id': {$nin: arrayConflictingIds}
			})
		.select({rooms: 1, name: 1, address: 1});

		if(data.length == 0){
			res.status(404).json({message:"Nenhum quarto foi encontrado"});
		}else{
			res.send(data);
		}
	}catch(error){
		res.status(500).json({message: error.message});
	}
}

export {};