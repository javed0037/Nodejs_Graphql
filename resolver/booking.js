const Booking =  require('../model/booking');
const EventSchema = require('../model/event');
const { bookingTransfrom, transformEvent } = require('./merge')

module.exports = {

bookEvent: async(args) => {
    try{
        const eventdata = await EventSchema.findOne({_id: args.bookingInput.eventId})
        const booking = new Booking({
            user: "5ff68f08efe110246b940dd2",
            event: eventdata,
        })
        const getBooking =  await booking.save();
        return bookingTransfrom(getBooking)
    }catch(err){
        console.log('error',err);
    }
    
},

booking: async () =>{
    try{
        const booking = await Booking.find();

        return booking.map((booking)=>{
          return bookingTransfrom(booking)
    })

    }catch(err){
        console.log('error',err);
    }
},
cancelBooking: async (args)=>{
    try{

        const booking = await Booking.findById(args.bookingId).populate('event');    
        await Booking.deleteOne({_id: args.bookingId});
        return transformEvent(booking.event);
    }catch(error){
        console.log("error",error)

    }
   
 }
}
