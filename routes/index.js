var express = require('express');
var router = express.Router();
var mongoURI = 'mongodb://admin:123456@ds129146.mlab.com:29146/performance-testing'
var MongoClient = require('mongodb').MongoClient;

/* GET home page. */
router.get('/', function(req, res, next) {
  MongoClient.connect(mongoURI, (err, db) => {
    if (err) {
      throw err;
    };

    db.collection('students').find({}).toArray(function(err, result) {
      if (err) {
        throw err;
      };
      
      db.close();

      res.render('index', { students: result });
    });
  });
});

module.exports = router;
