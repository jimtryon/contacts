var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET contacts page */
router.get('/contactlist', function(req, res) {
	var db = req.db;
	var collection = db.get('contacts');
	collection.find({}, {}, function(e, docs) {
		res.render('contactlist', {
			"contactlist" : docs
		});
	});

});

module.exports = router;
