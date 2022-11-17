const express = require('express');

const swaggerUi = require('swagger-ui-express');

const config = require('../config.js');
const user = require('./components/user/network');
const auth = require('./components/auth/network');
const post = require('./components/post/network');
const errors = require('../network/error');



const app = express();

//Middlewares
app.use(express.json())


// Routes
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/post', post);

// API-DOCS: Swagger
const swaggerDoc = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));


app.use(errors);


app.listen(config.api.port, () => {
    console.log('Api escuchando el puerto', config.api.port)
})