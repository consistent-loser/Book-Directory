const config = require('config');

module.exports = function() {
    
   // if(!config.has('jwtPrivateKey')){
       if(!process.env.jwtPrivateKey){
        throw new Error("FATAL ERROR: jwtPrivateKey not defined");
    }

   //  console.log(config.get('jwtPrivateKey'));

}