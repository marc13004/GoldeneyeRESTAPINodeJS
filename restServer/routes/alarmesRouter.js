var express = require('express');
var bodyParser = require('body-parser');
var alarmesRouter = express.Router();

var alarmes = require('../models/alarmes');


alarmesRouter.route('/:id')

.get(function(req,res,next)
{
    alarmes.getalarme(req.params.id, res);
})


module.exports = alarmesRouter;