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
    			case '1': data += '<svg width="92px" height="38px" viewBox="0 0 92 38" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <!-- Generator: Sketch 42 (36781) - http://www.bohemiancoding.com/sketch --> <desc>Created with Sketch.</desc> <defs> <ellipse id="path-1" cx="46.5" cy="19.5" rx="13.5" ry="13.5"></ellipse> <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="filter-2"> <feGaussianBlur stdDeviation="1.5" in="SourceAlpha" result="shadowBlurInner1"></feGaussianBlur> <feOffset dx="0" dy="1" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset> <feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1"></feComposite> <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" type="matrix" in="shadowInnerInner1"></feColorMatrix> </filter> <text id="text-3" font-family="LucidaGrande, Lucida Grande" font-size="24" font-weight="normal" fill="#7ED321"> <tspan x="37" y="29">✓</tspan> </text> <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="filter-4"> <feGaussianBlur stdDeviation="1.5" in="SourceAlpha" result="shadowBlurInner1"></feGaussianBlur> <feOffset dx="0" dy="1" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset> <feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1"></feComposite> <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" type="matrix" in="shadowInnerInner1"></feColorMatrix> </filter> <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="filter-5"> <feGaussianBlur stdDeviation="1.5" in="SourceAlpha" result="shadowBlurInner1"></feGaussianBlur> <feOffset dx="0" dy="1" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset> <feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1"></feComposite> <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" type="matrix" in="shadowInnerInner1"></feColorMatrix> </filter> </defs> <rect id="Rectangle" stroke="none" fill="#7ED321" fill-rule="evenodd" x="0" y="0" width="92" height="38"></rect> <g id="Oval" stroke="none" fill="none"> <use fill="#FFFFFF" fill-rule="evenodd" xlink:href="#path-1"></use> <use fill="black" fill-opacity="1" filter="url(#filter-2)" xlink:href="#path-1"></use> </g> <g id="✓" stroke="none" fill="none" fill-opacity="1"> <use fill="#7ED321" filter="url(#filter-4)" xlink:href="#text-3"></use> <use fill="#7ED321" filter="url(#filter-5)" xlink:href="#text-3"></use> </g> </svg>';
    				break;
    			case '2': data += '<svg width="92px" height="38px" viewBox="0 0 92 38" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <!-- Generator: Sketch 42 (36781) - http://www.bohemiancoding.com/sketch --> <desc>Created with Sketch.</desc> <defs> <circle id="path-1" cx="45.7009698" cy="19.5" r="13.5"></circle> <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="filter-2"> <feGaussianBlur stdDeviation="1.5" in="SourceAlpha" result="shadowBlurInner1"></feGaussianBlur> <feOffset dx="0" dy="1" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset> <feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1"></feComposite> <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" type="matrix" in="shadowInnerInner1"></feColorMatrix> </filter> <text id="text-3" font-family="Helvetica-Bold, Helvetica" font-size="22" font-weight="bold" fill="#D0011B"> <tspan x="41.1539938" y="28">!</tspan> </text> <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="filter-4"> <feGaussianBlur stdDeviation="1.5" in="SourceAlpha" result="shadowBlurInner1"></feGaussianBlur> <feOffset dx="0" dy="1" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset> <feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1"></feComposite> <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" type="matrix" in="shadowInnerInner1"></feColorMatrix> </filter> <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="filter-5"> <feGaussianBlur stdDeviation="1.5" in="SourceAlpha" result="shadowBlurInner1"></feGaussianBlur> <feOffset dx="0" dy="1" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset> <feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1"></feComposite> <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" type="matrix" in="shadowInnerInner1"></feColorMatrix> </filter> </defs> <rect id="Rectangle" stroke="none" fill="#D0011B" fill-rule="evenodd" x="0" y="0" width="92" height="38"></rect> <g id="Oval" stroke="none" fill="none"> <use fill="#FFFFFF" fill-rule="evenodd" xlink:href="#path-1"></use> <use fill="black" fill-opacity="1" filter="url(#filter-2)" xlink:href="#path-1"></use> </g> <g id="!" stroke="none" fill="none" fill-opacity="1"> <use fill="#D0011B" filter="url(#filter-4)" xlink:href="#text-3"></use> <use fill="#D0011B" filter="url(#filter-5)" xlink:href="#text-3"></use> </g> </svg>';
    				break;
    			case '3': data += '<svg width="92px" height="50px" viewBox="0 -12 92 50" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <!-- Generator: Sketch 42 (36781) - http://www.bohemiancoding.com/sketch --> <desc>Created with Sketch.</desc> <defs> <ellipse id="path-1" cx="45.5" cy="19.5" rx="13.5" ry="13.5"></ellipse> <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="filter-2"> <feGaussianBlur stdDeviation="1.5" in="SourceAlpha" result="shadowBlurInner1"></feGaussianBlur> <feOffset dx="0" dy="1" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset> <feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1"></feComposite> <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" type="matrix" in="shadowInnerInner1"></feColorMatrix> </filter> <text id="text-3" font-family="Helvetica" font-size="12" font-weight="normal" fill="#F8E81C"> <tspan x="33" y="2"> </tspan> <tspan x="33" y="16" font-family="LucidaGrande, Lucida Grande" font-size="24">→</tspan> </text> <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="filter-4"> <feGaussianBlur stdDeviation="1.5" in="SourceAlpha" result="shadowBlurInner1"></feGaussianBlur> <feOffset dx="0" dy="1" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset> <feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1"></feComposite> <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" type="matrix" in="shadowInnerInner1"></feColorMatrix> </filter> <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="filter-5"> <feGaussianBlur stdDeviation="1.5" in="SourceAlpha" result="shadowBlurInner1"></feGaussianBlur> <feOffset dx="0" dy="1" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset> <feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1"></feComposite> <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" type="matrix" in="shadowInnerInner1"></feColorMatrix> </filter> </defs> <rect id="Rectangle" stroke="none" fill="#F8E81C" fill-rule="evenodd" x="0" y="0" width="92" height="38"></rect> <g id="Oval" stroke="none" fill="none"> <use fill="#FFFFFF" fill-rule="evenodd" xlink:href="#path-1"></use> <use fill="black" fill-opacity="1" filter="url(#filter-2)" xlink:href="#path-1"></use> </g> <g id="→" stroke="none" fill="none" fill-opacity="1"> <use fill="#F8E81C" filter="url(#filter-4)" xlink:href="#text-3"></use> <use fill="#F8E81C" filter="url(#filter-5)" xlink:href="#text-3"></use> </g> </svg>';
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
