var express = require('express');

// Date library
var moment = require('moment');

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

/* GET new contact page. */
router.get('/newcontact', function(req, res, next) {
  res.render('newcontact', { title: 'Add New Contact' });
});

/* POST to Add Contact Service */
router.post('/addcontact', function(req, res) {
var db = req.db;
 // Set our internal DB variable  var db = req.db;
 // Get our form values. These rely on the "name" attributes
 var first = req.body.first;
 var last = req.body.last;
 var title = req.body.title;
 var company = req.body.company;
 var email = req.body.email;
 var wheremet = req.body.location;
 var datemet = moment().format('MM/DD/YYYY');
 var comments = req.body.comments; 
 // Set our collection
 var collection = db.get('contacts');

 // Submit to the DB
 collection.insert({
 "name" : { "first": first, "last": last},
 "title" : title,
 "company" : company,
 "email" : email,
 "wheremet" : wheremet,
 "datemet" : datemet,
 "comments" : comments
 }, function (err, doc) {
 if (err) {
 // If it failed, return error
 res.send("There was a problem adding the information to the database.");
 }
 else {
 // If it worked, set the header so the address bar doesn't say /adduser
 res.location("contactlist");
 // And forward to success page
 res.redirect("contactlist");
 }
 });
});

module.exports = router;
