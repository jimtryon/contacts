var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET hello world page. */
router.get('/hello', function(req, res, next) {
  res.render('helloworld', { title: 'Hello World' });
});

/* GET hello world page. */
router.get('/aboutme', function(req, res, next) {
  res.render('aboutme', { title: 'About Me' });
});

/* GET contact list page. */
router.get('/contactlist', function(req, res) {
    var db = req.db;
    var collection = db.get('contacts');
    collection.find({}, {}, function(e, docs) {
        res.render('contactlist', { title: 'Contact List',
           "contactlist":docs 
        });
    });
});

module.exports = router;
