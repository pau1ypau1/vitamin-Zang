var http = require('http');
var express = require('express');
var app = express();
var path = require('path');
var request = require("request");
var bodyParser  = require('body-parser');

var phoneTo = '';
var phoneFrom = '16139092162'; // Sprinkle's zang number

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());





var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : '54.237.239.59',
    user     : 'db',
    password : 'rhok',
    database : 'vitaminzang'
});

connection.connect();
console.log(1);
var queryString = 'select p.firstname, p.lastname, p.room, p.ward, s.status from vitaminzang.patient p left join vitaminzang.medstatus s on p.patientid = s.patientid';

connection.query(queryString, function(err, rows, fields) {
    if (err) throw err;
    var data = '';
    for (var i in rows) {

		data += '<tr><td>';

    	if (typeof rows[i].status != "undefined") {
    		switch (rows[i].status) {
    			case '1': data += '<img src="1.png" style="width:100px;" />';
    				break;
    			case '2': data += '<img src="2.png" style="width:100px;" />';
    				break;
    			case '3': data += '<img src="3.png" style="width:100px;" />';
    				break;
    		}
    	}

      data +='</td><td>' + rows[i].firstname + ' ' + rows[i].lastname + '</td><td>' + rows[i].room + '</td><td>' + rows[i].ward + '</td></tr>';
    }
    console.log(2);

    fs = require('fs');
	fs.readFile('index.html', 'utf8', function (err,htmlData) {
	  console.log(4);
	    if (err) {
	      return console.log(err);
	    }
	    var sprintf = require("sprintf-js").sprintf;

		htmlData = sprintf(htmlData, data);
		
		app.get('/', function(req, res){
		  console.log(7);
		  res.writeHead(200, {'Content-Type': 'text/html'});
		  res.write(htmlData);
		  res.end();

		  //res.sendFile(path.join(__dirname + '/index.html'));
		});

		//console.log(htmlData);
	});

	console.log(5);
});

console.log(3);
connection.end();

//console.log(data);
//console.log("I'm {age} years old!".supplant({ age: 29 }));
//console.log(htmlData.supplant({data: data}));


app.get('/vitaminapi', function(req, res){ 
  console.log(req.query);
  res.redirect('/');
});


app.get('/phNum', function(req, res){ 
  //console.log(req.query['phoneNum']);
  
  var options = {
  	method: 'POST',
  	url: 'https://api.zang.io/v2/Accounts/AC7c889084457938dc50ca4f0f8b6bee22/SMS/Messages.json',
  	headers: 
  	{
  	'cache-control': 'no-cache',
  	'content-type': 'application/x-www-form-urlencoded',
  	authorization: 'Basic ' + new Buffer('AC7c889084457938dc50ca4f0f8b6bee22:deb05f2d8251479399ccb3fe2b1078ee', 'utf8').toString('base64') },
  	form: { To: req.query['phoneNum'], From: phoneFrom, Body: 'Hello, test' }
  };

  request(options, function (error, response, body) {
  	if (error) throw new Error(error);

  	console.log(body);
  });
  
  
  res.redirect('/');
});




/*
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
*/

//server.listen(8080, 'localhost');
app.listen(8080, 'localhost');
console.log("Server running at http://127.0.0.1:80/");
