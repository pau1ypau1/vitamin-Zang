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
var data;
 
connection.query(queryString, function(err, rows, fields) {
    if (err) throw err;
    var data = '';
    for (var i in rows) {
      data += '<tr><td>R/Y/G</td><td>' + rows[i].firstname + ' ' + rows[i].lastname + 
        '</td><td>' + rows[i].room + '</td><td>' + rows[i].ward + '</td></tr>';
        //console.log('First name: ', rows[i].firstname);
    }
    //console.log(a);
});
 
connection.end();

fs = require('fs')
fs.readFile('index.html', 'utf8', function (err,htmlData) {
    if (err) {
      return console.log(err);
    }
    console.log(htmlData);
  });

supplant = function (o) {
    return this.replace(/{([^{}]*)}/g,
        function (a, b) {
            var r = o[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        }
    );
};

//console.log("I'm {age} years old!".supplant({ age: 29 }));
//console.log(htmlData.supplant({data: data}));

app.get('/', function(req, res){
  //res.writeHead(200, {'Content-Type': 'text/plain'});
  //res.write('Hello World!\n');
  //res.end();
  //res.send('hello World!')
  //console.log(htmlData.supplant({data: data}));
  res.sendFile(path.join(__dirname + '/index.html'));
});

/*
app.post('/data', function(req, res){
  //res.send(data);
  console.log(data);
});
*/


//server.listen(8080, 'localhost');
app.listen(8080, 'localhost');
console.log("Server running at http://127.0.0.1:80/");
