const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/prod')(app);

//-------------------------------------------------------------------------------------------------------//
//-----------------------------------------Establish Server----------------------------------------------//
//-------------------------------------------------------------------------------------------------------//
const port = 3000;
app.listen(port, () => winston.log('info',`Listening to Port ${port}`));

