const express = require('express');

const secure = require('./secure');
const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();


router.get('/',       list);
router.get('/:id',    get);
router.get('/followers/:id', followers)
router.post('/follow/:id', secure('follow'), follow);
router.post('/',      upsert);
router.put('/', secure('update'), upsert);
router.delete('/:id', remove);

function list( req, res, next ) {
    Controller.list()
        .then((list) => {
            response.success(req, res, list, 200)
        })
        .catch(next)
}
function get( req, res, next ) {
    Controller.get(req.params.id)
    .then((user) => {
        response.success(req, res, user, 200)
    })
    .catch(next)
}

function followers( req, res, next ) {
    Controller.followers(req.params.id)
    .then((users) => {
        response.success(req, res, users, 200)
    })
    .catch(next)
}

function follow(req, res, next){
    Controller.follow(req.user.id, req.params.id)
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(next);
}

function upsert( req, res, next ) {
    Controller.upsert(req.body)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch(next)
}
function remove( req, res, next ) {
    Controller.remove(req.params.id)
    .then((user) => {
        response.success(req, res, user, 200)
    })
    .catch(next)
}

module.exports = router;