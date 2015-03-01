var http = require('http');
var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
	debug('Express server listening on port ' + server.address().port);
})


