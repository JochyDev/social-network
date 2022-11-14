const express = require('express');

const config = require('../config.js');
const user = require('./components/user/network');

const app = express();

//Middlewares
app.use(express.json())

// Router
app.use('/api/user', user);



app.listen(config.api.port, () => {
    console.log('Api escuchando el puerto', config.api.port)
})