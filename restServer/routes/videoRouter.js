var express = require('express');
var bodyParser = require('body-parser');
var videoRouter = express.Router();

var video = require('../logical/videoManager');



videoRouter.route('/')

.post(function(req,res,next)
{
    video.postTele(req, res);
})

videoRouter.route('/stoprec')

.get(function(req, res,next)
{
    video.stoprec(res);
})


 
module.exports = videoRouter;