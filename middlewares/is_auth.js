
const jwt = require('jsonwebtoken');
module.exports = (req,res,next)=>{
    
    const authHeder = req.get("Authorization");
    
    if(!authHeder){
        req.isAuth =false;
        return next();
    }
    const token = authHeder.split(' ')[1]; // Bearer token.
    
    if(!token || token === ''){
        req.isAuth = false;
        return next();
    }
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, "ad2wallet");

        if (!decodedToken) {
            req.isAuth = false;
            return next();
        }
        req.isAuth = true;
        req.userId = decodedToken.userId;
        next();

    } catch (error) {
        req.isAuth = false;
        return next();
        
    }

}