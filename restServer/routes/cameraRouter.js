var express = require('express');
var bodyParser = require('body-parser');
var cameras = express.Router();
var telechargement = require('../logical/videoManager');
var camera = require('../models/camera');

/** get all and post a new user */
cameras.route('/')

.get(function(req,res,next)
{
    camera.getAll(res,next);
})

.post(function(req, res, next)
{
    camera.create(req.body, res);
})


.delete(function(req, res, next)
{
    //TODO : get element by req.params.userId
    camera.delete(req.body, res);
    telechargement.deleteVideo(req.body, res);
})

cameras.route('/rec')

.post(function(req, res,next)
{
    camera.rec(req.body, res);
})


module.exports = cameras;
