var http = require('http');
var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(__dirname + '/public'))

/*
var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello World\n");
});
*/


var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : '54.237.239.59',
    user     : 'db',
    password : 'rhok',
    database    : 'vitaminzang'
});

connection.connect();
 
var queryString = 'select * from vitaminzang.patient';
 
connection.query(queryString, function(err, rows, fields) {
    if (err) throw err;
 
    for (var i in rows) {
        console.log('First name: ', rows[i].firstname);
    }
});
 
connection.end();


app.get('/', function(req, res){
  //res.writeHead(200, {'Content-Type': 'text/plain'});
  //res.write('Hello World!\n');
  //res.end();
  //res.send('hello World!')
  res.sendFile(path.join(__dirname + '/index.html'));
});




//server.listen(8080, 'localhost');
app.listen(8080, 'localhost');
console.log("Server running at http://127.0.0.1:80/");
