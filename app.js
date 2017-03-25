var http = require('http');
var express = require('express');
var app = express();
var path = require('path');
var request = require("request");


var phoneTo = '';
var phoneFrom = '16139092162'; // Sprinkle's zang number

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

  res.sendFile(path.join(__dirname + '/index2.html'));
});

var options = {
	method: 'POST',
	url: 'https://api.zang.io/v2/Accounts/AC7c889084457938dc50ca4f0f8b6bee22/SMS/Messages.json',
	headers: 
	{
	'cache-control': 'no-cache',
	'content-type': 'application/x-www-form-urlencoded',
	authorization: 'Basic ' + new Buffer('AC7c889084457938dc50ca4f0f8b6bee22:deb05f2d8251479399ccb3fe2b1078ee', 'utf8').toString('base64') },
	form: { To: phoneTo, From: phoneFrom, Body: 'Hello, test' }
};

request(options, function (error, response, body) {
	if (error) throw new Error(error);

	console.log(body);
});



//server.listen(8080, 'localhost');
app.listen(8080, 'localhost');
console.log("Server running at http://127.0.0.1:80/");
