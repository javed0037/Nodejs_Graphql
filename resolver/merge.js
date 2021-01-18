const UserSchema = require('../model/user');
const EventSchema = require('../model/event');
const { dateToSting } = require('../helpers/date')

const getEvent = async (eventId) => {
    try {
      const event =   await  EventSchema.find({
            _id: {
                $in: eventId
            }
        });
        return  event.map(data => {
                return {
                    ...data._doc,
                    _id: data.id,
                    creator:  userfunction.bind(this, data.creator)
                }
            })
        }catch(e){
            console.log(e)
    
        }
    }
    
const userfunction = async (userId) => {

    try{
        const user =  await UserSchema.findById(userId);
        const data =  {
                ...user._doc,
                createEvent:  getEvent.bind(this, user.createEvent)
            }
            return data;
        
        } catch(e){
            console.log(e);
        }
    
    }
    
    const singleEvent  = async(eventId)=>{
        const event = await EventSchema.findById(eventId);   
        return transformEvent(event);
    }

    const transformEvent = event => { 
        return {
        ...event._doc,
        _id:event.id,
        date: dateToSting(event._doc.date),
        creator: userfunction.bind(this, event._doc.creator)
       }
    }

const bookingTransfrom = booking => {
    
    return {
              ...booking._doc,
                _id: booking.id,
                user: userfunction.bind(this, booking._doc.user),
                event: singleEvent.bind(this,booking._doc.event),
                createdAt: dateToSting(booking.createdAt),
                updatedAt: dateToSting(booking.updatedAt)
    }

}
    
    

    exports.getEvent = singleEvent;
    exports.userfunction = singleEvent;
    exports.singleEvent = singleEvent;
    exports.transformEvent = transformEvent;
    exports.bookingTransfrom = bookingTransfrom;



