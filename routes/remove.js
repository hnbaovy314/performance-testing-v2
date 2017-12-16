var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var mongoURI = 'mongodb://admin:123456@ds129146.mlab.com:29146/performance-testing';

/* Remove one record */
router.get('/', function(req, res, next) {
  MongoClient.connect(mongoURI, (err, db) => {
    if (err) {
      throw err;
    };

    db.collection('students').deleteOne({});
    db.close();

    res.redirect('/');    
  });
});

module.exports = router;
