var express = require('express');
var router = express.Router();
var Counter = require('../models/counter.js');

// get all counters
router.get('/counters', function(req, res, next) {
  Counter.find(function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      res.json(data);
    }
  });
});


// get a counter
router.get('/counter/:id', function(req, res, next) {
  Counter.findById(req.params.id, function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      res.json(data);
    }
  });
});

// post a counter
router.post('/counters', function(req, res, next) {
  newCounter = new Counter({
    name: req.body.name,
    count: parseFloat(req.body.count)
  });
  newCounter.save(function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      res.json(data);
    }
  });
});

// put a counter
router.put('/counter/:id', function(req, res, next) {
  var update = {
    name: req.body.name,
    count: parseFloat(req.body.count)
  };
  Counter.findByIdAndUpdate(req.params.id, update, function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      res.json(data);
    }
  });
});

// delete a counter
router.delete('/counter/:id', function(req, res, next) {
  Counter.findByIdAndRemove(req.params.id, function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      res.json(data);
    }
  });
});

module.exports = router;
