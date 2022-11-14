const express = require('express');

const response = require('../../../network/response');
const Controller = require('./index')

const router = express.Router();

router.get('/login', function(req, res){
    Controller.login(req.body.username, req.body.password)
        .then(token => {
            response.success(req, res, token, 200)
        })
        .catch(() => {
            response.error(req, res, 'Informacion invalida', 400)
        })
})

module.exports = router;