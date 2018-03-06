var express = require('express');
var bodyParser = require('body-parser');
var bmpRouter = express.Router();

var bmp = require('../models/bmp');


bmpRouter.route('/all')

.get(function(req,res,next)
{
    bmp.getAll(res);
})


bmpRouter.route('/')

.get(function(req,res,next)
{
    bmp.getNow(res);
})
 
module.exports = bmpRouter;