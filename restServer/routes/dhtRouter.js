var express = require('express');
var bodyParser = require('body-parser');
var dhtRouter = express.Router();

var dht = require('../models/dht');


dhtRouter.route('/all')

.get(function(req,res,next)
{
    dht.getAll(res);
})

dhtRouter.route('/lastdays')
.get(function(req,res,next)
{
    dht.getLastDays(res);
})

dhtRouter.route('/')

.get(function(req,res,next)
{
    dht.getNow(res);
})
 
module.exports = dhtRouter;