var http = require('http');
var express = require('express');
var app = express();
var path = require('path');

/*
var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello World\n");
});
*/

app.get('/', function(req, res){
  //res.writeHead(200, {'Content-Type': 'text/plain'});
  //res.write('Hello World!\n');
  //res.end();
  //res.send('hello World!')
  res.sendFile(path.join(__dirname + '/dashboard.htm'));
});



//server.listen(8080, 'localhost');
app.listen(8080, 'localhost');
console.log("Server running at http://127.0.0.1:80/");
