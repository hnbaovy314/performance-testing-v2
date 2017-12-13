var express = require('express');
var router = express.Router();
var mongoURI = 'mongodb://admin:123456@ds129146.mlab.com:29146/performance-testing'
var MongoClient = require('mongodb').MongoClient;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Your page' });
});

module.exports = router;
