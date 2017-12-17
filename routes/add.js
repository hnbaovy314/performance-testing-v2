var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var randomId = require('random-id');

var mongoURI = 'mongodb://admin:123456@ds129146.mlab.com:29146/performance-testing'
var MongoClient = require('mongodb').MongoClient;

nameArray = ["Arthur", "Jeanne", "Elizabeth", "Media"];
genderArray = ["Male", "Female"];
birthArray = ["1850", "1766", "1812", "1001"];
cityArray = ["London", "Paris", "Slovakia", "Texas"];

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

/* Add one record */
router.get('/', function(req, res, next) {

  // Randomize info
  student = {
    _id: randomId(),
    name: nameArray[Math.floor(Math.random() * nameArray.length)],
    gender: genderArray[Math.floor(Math.random() * genderArray.length)],
    birthyear: birthArray[Math.floor(Math.random() * birthArray.length)],
    city: cityArray[Math.floor(Math.random() * cityArray.length)]
  };
  

  MongoClient.connect(mongoURI, (err, db) => {
    if (err) {
      console.log(err);
      throw err;
    };

    db.collection('students').insert(student);
    db.close();

    res.redirect('/');

  });
});



module.exports = router;
