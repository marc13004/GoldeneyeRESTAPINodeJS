var express = require('express');
var router = express.Router();

var conPir = require('../logical/connectionPir');


//Démarrage de la détection de présence

router.route('/')

.get(function(req,res,next)
{
    conPir.init();
    res.json({message:'detection ok'});

})


//Arrêt de la détection de présence

router.route('/stop')

.get(function(req,res,next)
{
    conPir.stop();
    res.json({message: 'detection stopped'});

})

module.exports = router;
