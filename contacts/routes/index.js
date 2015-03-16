var express = require('express');

// Date library
var moment = require('moment');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

/* GET contact list page. */
router.get('/contacts', function(req, res) {
    var db = req.db;
    var collection = db.get('contacts');
    var options = {
            "limit": 20,
            "sort": "name.last"
        }
        // params: query object, fields, options, callback 
    collection.find({}, options, function(e, docs) {
        res.render('contacts', {
            title: 'Contact List',
            "contacts": docs
        });
    });
});

/* GET new contact page */
router.get('/addcontact', function(req, res, next) {
    res.render('addcontact', {
        title: 'Add New Contact'
    });
});

/* POST to Add Contact Service */
router.post('/addcontact', function(req, res) {

    var db = req.db;

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
            res.location("contacts");
            // And forward to success page
            res.redirect("contacts");
        }
    });
});


router.get('/editcontact/:id', function(req, res) {

var db = req.db;

var id = req.params.id;

var collection = db.get('contacts');

collection.findOne( {"_id": id} , function(e, docs) {
  res.render('editcontact', { title: 'Update Contact',
    "editcontact":docs
    });
  });
});



module.exports = router;
