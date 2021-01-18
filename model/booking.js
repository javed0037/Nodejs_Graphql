const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const BookingSchema = new Schema({

user:{
    type: Schema.Types.ObjectId,
    ref: 'User'
},
event: {
    type: Schema.Types.ObjectId,
    ref:'Event'
},
},{timestamps: true})

module.exports = mongoose.model('Booking', BookingSchema)