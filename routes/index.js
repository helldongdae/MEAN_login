var passport = require('passport');
var fs = require('fs');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var WebSocketS = require("ws").Server;
var wss = new WebSocketS({ port: 3000 });
var Schedule = require('../models/schedule');
var User = require('../models/user');

var urlencodedParser = bodyParser.urlencoded({ extended: false })
module.exports = function(app)
{
    app.get('/',function(req,res){
        fs.readFile('views/index.html', function(err, data) {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(data);
			res.end();
	 	});
    });

	app.get('/success', urlencodedParser,function(req,res){
		var usr = JSON.parse(JSON.stringify(req.user));
		wss.on("connection", function(ws) {
			if(usr.master){
  				ws.send("master");
			}
			else
				ws.send("user");
  			ws.on("message", function(message) {
    			console.log("Received: %s", message);
  			});
		});
		var times = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth']
        fs.readFile('views/main.html', function(err, data) {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(data);
			if(usr.master == true)
				res.write("Logged in as master\n");
			else
				res.write("Logged in as user\n");
			res.write('<table>\n<tr>\n <th>Time</th>\n ');
			User.find ({}, function (err, users){
				users.forEach(function(user) {
					if(user.email != 'master'){
						res.write('  <th>');
      					res.write(user.email);
						res.write('</th>');
					}
    			});
				res.write('\n</tr>');
				res.write('\n<tr>\n <th>first</th>\n ');
				users.forEach(function(user) {
					if(user.email != 'master'){
						res.write('  <th>');
      					res.write(user.schedule[0].first);
						res.write('</th>');
					}
    			});
				res.write('\n</tr>');
				res.write('\n<tr>\n <th>second</th>\n ');
				users.forEach(function(user) {
					if(user.email != 'master'){
						res.write('  <th>');
      					res.write(user.schedule[0].second);
						res.write('</th>');
					}
    			});
				res.write('\n</tr>');
				res.write('\n<tr>\n <th>third</th>\n ');
				users.forEach(function(user) {
					if(user.email != 'master'){
						res.write('  <th>');
      					res.write(user.schedule[0].third);
						res.write('</th>');
					}
    			});
				res.write('\n</tr>');
				res.write('\n<tr>\n <th>fourth</th>\n ');
				users.forEach(function(user) {
					if(user.email != 'master'){
						res.write('  <th>');
      					res.write(user.schedule[0].fourth);
						res.write('</th>');
					}
    			});
				res.write('\n</tr>');
				res.write('\n<tr>\n <th>fifth</th>\n ');
				users.forEach(function(user) {
					if(user.email != 'master'){
						res.write('  <th>');
      					res.write(user.schedule[0].fifth);
						res.write('</th>');
					}
    			});
				res.write('\n</tr>');
				res.write('</table>');
				res.end();
			});	
	 	});
    });

	app.get('/addSchedule',function(req,res){
		fs.readFile('views/addSchedule.html', function(err, data) {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(data);
			res.write("User:<br>\n <select name=\"user\">\n");
			User.find ({}, function (err, users){
				users.forEach(function(user) {
					if(user.email != 'master'){
						res.write("<option value=\"");
      					res.write(user.email);
						res.write("\">");
						res.write(user.email);
						res.write("</option>\" \n");
					}
				});
				res.write("<input type=\"submit\" value=\"Submit\"><br>\n </form>");
				res.end();
    		});
	 	});
    });

	app.get('/fail',function(req,res){
		res.write('ID or password fail');
		res.end();
    });

	app.post('/login', urlencodedParser, passport.authenticate('login', {
	    successRedirect : '/success', 
	    failureRedirect : '/fail',
	    failureFlash : false 
	}))

	app.post('/signup', urlencodedParser, passport.authenticate('signup', {
	    successRedirect : '/success', 
	    failureRedirect : '/fail',
	    failureFlash : false 
	}))

	app.post('/add_schedule', urlencodedParser, function(req,res){
		console.log(req.body);
		User.findOne({ 'email' : req.body.user }, function(err, user) {
			console.log(user)
			var usr = req.body.user;
			var time = req.body.time;
			user.schedule[0][time] = req.body.name;
			User.findOneAndUpdate({ 'email' : req.body.user }, user, {upsert:true}, function(err, doc){
    			if (err) console.log(err)
				console.log('updated schedule')
				res.redirect('/success');
			});
		});			
	})
}
