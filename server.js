var http = require('http');

var server = http.createServer(function(request, response) {
console.log("I got a request!");
response.write("Hello");
response.end();

});

server.listen(3000);
