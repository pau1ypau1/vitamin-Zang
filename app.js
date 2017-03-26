var http = require('http');
var express = require('express');
var app = express();
var path = require('path');
var request = require("request");
var bodyParser  = require('body-parser');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// Sprinkle's zang number
var phoneFrom = '16139092162'; 

// My SQL database connection information
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : '54.237.239.59',
    user     : 'db',
    password : 'rhok',
    database : 'vitaminzang'
});

connection.connect();

// fetching dashboard information
var queryString = 'select p.firstname, p.lastname, p.room, p.ward, s.status from vitaminzang.patient p left join vitaminzang.medstatus s on p.patientid = s.patientid';

connection.query(queryString, function(err, rows, fields) {
    if (err) throw err;
    var data = '';
    for (var i in rows) {

		data += '<tr><td>';

		// status colouring
    	if (typeof rows[i].status != "undefined") {
    		switch (rows[i].status) {
    			case '1': data += '<img src="/1.png" style="width:100px;" />';
    				break;
    			case '2': data += '<img src="/2.png" style="width:100px;" />';
    				break;
    			case '3': data += '<img src="/3.png" style="width:100px;" />';
    				break;
    		}
    	}

      data +='</td><td>' + rows[i].firstname + ' ' + rows[i].lastname + '</td><td>' + rows[i].room + '</td><td>' + rows[i].ward + '</td></tr>';
    }

    // fetching page frame
    fs = require('fs');
	fs.readFile('index.html', 'utf8', function (err,htmlData) {
	    if (err) {
	      return console.log(err);
	    }
	    
	    // insert dynamic data
	    var sprintf = require("sprintf-js").sprintf;
		htmlData = sprintf(htmlData, data);
		
		// Display
		app.get('/', function(req, res){
		  res.writeHead(200, {'Content-Type': 'text/html'});
		  res.write(htmlData);
		  res.end();
		});
	});
});

connection.end();


// Vitamin-zang api for zang notification replies
app.get('/vitaminapi', function(req, res){ 
  console.log(req.query);
  res.redirect('/');
});


// Zang api notifications
var notificationBody = 'Hi, this is a reminder to please take your meds.'; // need to bilingualize app
app.get('/phNum', function(req, res){ 
  var options = {
  	method: 'POST',
  	url: 'https://api.zang.io/v2/Accounts/AC7c889084457938dc50ca4f0f8b6bee22/SMS/Messages.json',
  	headers: 
  	{
  	'cache-control': 'no-cache',
  	'content-type': 'application/x-www-form-urlencoded',
  	authorization: 'Basic ' + new Buffer('AC7c889084457938dc50ca4f0f8b6bee22:deb05f2d8251479399ccb3fe2b1078ee', 'utf8').toString('base64') },
  	form: { To: req.query['phoneNum'], From: phoneFrom, Body: notificationBody }
  };

  request(options, function (error, response, body) {
  	if (error) throw new Error(error);

  	console.log(body);
  });
  
  res.redirect('/');
});

/*
var phoneTo = '';
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
