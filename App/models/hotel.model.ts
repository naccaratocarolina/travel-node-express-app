const { Schema, model } = require('mongoose');

const hotelSchema = new Schema(
    {
        name: {
            type: String,
            unique: false,
            required: [true, "Voce esqueceu de inserir o seu nome :)"]
        },

		// Relação 1-1
        address: {
			city: {
				type: String,
				required: [true, "O campo 'cidade' é obrigatório"]
			},
			state: {
				type: String,
				required: [true, "O campo 'estado' é obrigatório"]
			},
			street: {
				type: String,
				required: [true, "O campo 'Rua' é obrigatório"]
			},
			number: {
				type: String,
				required: [true, "O campo 'Número' é obrigatório"]
			}
		},
		
		// Relação 1-N
		rooms: [{
			price: {
				type: Number,
				required: [true, "O campo 'Preço' é obrigatório"]
			},
			capacity: {
				type: Number,
				required: [true, "O campo 'Número de hóspede' é obrigatório"]
			},
			description: {
				type: String,
				required: [true, "O campo 'Descrição' é obrigatório"]
			}			
		}],

		// Relação N-N
		ratings: [{type: Schema.Types.ObjectId, ref: 'Rating'}]
    },
    { timestamps: true, collection: "hotels" }
);

module.exports = model('Hotel', hotelSchema);

export {};