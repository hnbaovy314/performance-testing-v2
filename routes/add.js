var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var mongoURI = 'mongodb://admin:123456@ds129146.mlab.com:29146/performance-testing';

nameArray = ["John", "Jane", "George", "Mary"];
genderArray = ["Male", "Female"];
birthArray = ["1994", "1995", "1996", "1997"];
cityArray = ["New York", "California", "San Francisco", "Texas"];

/* Add one record */
router.get('/', function(req, res, next) {

  // Randomize info
  student = {
    name: nameArray[Math.floor(Math.random() * nameArray.length)],
    gender: genderArray[Math.floor(Math.random() * genderArray.length)],
    birthyear: birthArray[Math.floor(Math.random() * birthArray.length)],
    city: cityArray[Math.floor(Math.random() * cityArray.length)]
  };

  MongoClient.connect(mongoURI, (err, db) => {
    if (err) {
      throw err;
    };

    db.collection('students').insert(student);
    db.close();

    res.redirect('/');
  });
});

module.exports = router;
