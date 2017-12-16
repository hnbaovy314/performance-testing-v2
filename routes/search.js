var express = require('express');
var router = express.Router();
var mongoURI = 'mongodb://admin:123456@ds129146.mlab.com:29146/performance-testing'
var MongoClient = require('mongodb').MongoClient;

/* Search route */
router.get('/', function (req, res, next) {
  searchTerm = {
    name: {'$regex': '^' + req.query.sName + '$', '$options': 'i'},
    gender: req.query.sGender,
    birthyear: req.query.sBirthyear,
    city: {'$regex': '^' + req.query.sCity + '$', '$options': 'i'}
  };

  Object.keys(searchTerm).forEach((key) => {
    if (searchTerm[key] == '' || searchTerm[key].$regex == '^$') {
      delete searchTerm[key];
    };
  });

  console.log("Search Term:", searchTerm);

  MongoClient.connect(mongoURI, (err, db) => {
    if (err) {
      throw err;
    };

    db.collection('students').find(searchTerm).toArray(function (err, result) {
      if (err) {
        throw err;
      };

      db.close();

      res.render('index', { students: result });
    });
  });
});

module.exports = router;
