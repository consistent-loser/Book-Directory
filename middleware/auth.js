const config = require('config');
const jwt = require('jsonwebtoken');

function auth (req,res,next){
    const token = req.header('x-auth-token');

    if(!token){
        return res.status(401).send("access Denied. No token provided");
    }
    try{
        const decoded = jwt.verify(token,process.env.jwtPrivateKey);
        req.user = decoded;
        next();
    }
    catch(err){
        res.status(400).send("Bad Request: Invalid Token");
    }
    
}
module.exports = auth;