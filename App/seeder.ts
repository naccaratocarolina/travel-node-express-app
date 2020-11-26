//Models
const User = require('./models/user.model.ts');
const Hotel = require('./models/hotel.model.ts');
const Rating = require('./models/rating.model.ts');

// Conexão com o BD
const DBConnection = require('./config/connection.ts');
const mongoose = require('mongoose');

// Módulo que gera dados aleatórios
const faker = require('faker');

// Módulo que contém funções auxiliares para lidar com arrays
const _ = require('lodash');

// O arquivo deve ser executado com o comando  node -r esm seeder.ts 

// Como não estamos executando o server.ts, é necessário estabelecer a conexão com o BD
DBConnection();


// Seed de User
let users = [];
const userQuantity = 20;

for(let i = 0; i < userQuantity; i++){
	users.push(
		new User({
			name: faker.name.firstName(),
			email: faker.internet.email(),
			hash: 'hashaleatoria',
			salt: 'saltaleatoria'
		})
	)
}

let done = 0;
for(let i = 0; i < users.length; i++){
	users[i].save( function (err, result) {
		// Exibe o erro ocorrido no terminal
		if(err){
			console.log(err);
			exit();
		}else{
			done++;
			if(done === users.length) {
				console.log("O seed de usuários foi realizado com sucesso!");
			}
		}
	});
}

//Seed de Hotel
let hotels = [];
const hotelQuantity = 10;

for(let i = 0; i < hotelQuantity; i++){
	hotels.push(
		new Hotel({
			name: faker.name.firstName(),
			address: {
				city: faker.address.city(),
				state: faker.address.state(),
				street: faker.address.streetName(),
				number: faker.random.number(),
			},
			rooms: {
				price: faker.random.number(),
				capacity: faker.random.number(),
				description: faker.lorem.sentence()
			}
		})
	)
}

let hotelsDone = 0;
for(let i = 0; i < hotels.length; i++){
	hotels[i].save( function (err, result) {
		// Exibe o erro ocorrido no terminal
		if(err){
			console.log(err);
			exit();
		}else{
			hotelsDone++;
			if(hotelsDone === hotels.length) {
				console.log("O seed de hotéis foi realizado com sucesso!");
			}
		}
	});
}

//Seed de Rating
let ratings = [];
const ratingQuantity = 10;

for(let i = 0; i < ratingQuantity; i++){
	ratings.push(
		new Rating({
			_user: _.sample(users)._id,
			_hotel: _.sample(hotels)._id,
			rating: faker.random.number()
		})
	)
}

let ratingsDone = 0;
for(let i = 0; i < ratings.length; i++){
	ratings[i].save( function (err, result) {
		// Exibe o erro ocorrido no terminal
		if(err){
			console.log(err);
			exit();
		}else{
			ratingsDone++;
			if(ratingsDone === ratings.length) {
				console.log("O seed de avaliações foi realizado com sucesso!");
				exit();
			}
		}
	});
}

// Desconectamos do banco de dados
function exit() {
	mongoose.disconnect();
}

export {};