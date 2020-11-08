const { Schema, model } = require('mongoose');

const bookingSchema = new Schema(
	{	hotelId: {type: Schema.Types.ObjectId, ref: 'Hotel'},
		roomId: {type: Schema.Types.ObjectId},
		startDate: {type: Date},
		endDate: {type: Date}
	}
);

module.exports = model('Booking', bookingSchema);
export {};