var express = require('express');
var router = express.Router();
var mongoURI = 'mongodb://admin:123456@ds129146.mlab.com:29146/performance-testing'
var MongoClient = require('mongodb').MongoClient;

var sInfo = {
  id: '1415',
  name: 'John',
  gender: 'male',
  birthday: '01-01-1990',
  email: '',
  phone: ''
};


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('add', { title: 'Add page' });
  console.log('A get request has been made to Add page');
});

router.post('/submit', function(req, res, next) {
  console.log("A post request has been sent!");
  MongoClient.connect(mongoURI, (err, db) => {
    if (err) {
      console.log(err);
    } else {
      db.collection('students').insert({name: "Violet", gender: "female", birthyear: "2000"});
      db.close();
    }
  });
});

module.exports = router;
