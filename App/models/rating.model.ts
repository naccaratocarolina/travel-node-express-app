const { Schema, model } = require('mongoose');

const ratingSchema = new Schema(
    {
		_user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: [true]
		},

		_hotel: {
			type: Schema.Types.ObjectId,
			ref: 'Hotel',
			required: [true]
		},

        rating: {
            type: Number,
            required: [true]
        }   
    }
);

module.exports = model('Rating', ratingSchema);

export {};