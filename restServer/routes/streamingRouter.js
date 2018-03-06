var express = require('express');
var router = express.Router();

var conStream = require('../logical/connectionStreaming');



//Démarrage de mjpg-streamer

router.route('/')

.get(function(req,res,next)
{
    conStream.init(res);
})



//Arrêt de mjpg-streamer

router.route('/stop')

.get(function(req,res,next)
{
    conStream.stop(res);
})

module.exports = router;