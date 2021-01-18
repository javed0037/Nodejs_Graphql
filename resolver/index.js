const authResolver = require('./auth');
const eventResolver = require('./event');
const bookingResolver = require('./booking');





exports.rootResolver = {
    ...authResolver,
    ...eventResolver,
    ...bookingResolver
}






