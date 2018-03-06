var express = require('express');
var bodyParser = require('body-parser');
var markerRouter = express.Router();

var marker = require('../models/item');


markerRouter.route('/')

.get(function(req,res,next)
{
    marker.getAll(res);
})

.post(function(req, res, next)
{
    //TODO : convert json to other json
    marker.create(req.body, res);
});

markerRouter.route('/:id')

.get(function(req,res,next)
{
    //TODO : get element by req.params.itemId
    marker.get(req.params.id, res);
})

.put(function(req, res, next)
{
  //TODO : get element by req.params.itemId
    marker.update(req.params.id, req.body, res);
})

.delete(function(req, res, next)
{
    //TODO : get element by req.params.itemId
    marker.delete(req.params.id, res);
});
 
module.exports = markerRouter;
