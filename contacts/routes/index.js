// Load Express
var express = require('express');

// Load the Date module 
var moment = require('moment');

// Create a new router
var router = express.Router();

/* GET contact list page. */
router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('contacts');
    var options = {
            "limit": 20,
            "sort": "name.last"
        }
        // params: query object, fields, options, callback 
    collection.find({}, options, function(e, docs) {
      /* Contact list view */
        res.render('view', {
            title: 'Contact List',
            "view": docs
        });
    });
});

/* GET new contact page */
router.get('/new-contact', function(req, res, next) {
    res.render('add', {
        title: 'Add New Contact'
    });
});

/* POST to Add Contact Service */
router.post('/add', function(req, res) {
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
        "name": {
            "first": first,
            "last": last
        },
        "title": title,
        "company": company,
        "email": email,
        "wheremet": wheremet,
        "datemet": datemet,
        "comments": comments
    }, function(err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        } else {
            // If it worked, set the header so the address bar doesn't say /adduser
            res.location("/");
            // And forward to success page
            res.redirect("/");
        }
    });
});

module.exports = router;
