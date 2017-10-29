var passport = require('passport');
var fs = require('fs');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var WebSocketS = require("ws").Server;
var wss = new WebSocketS({ port: 3000 });
var Schedule = require('../models/schedule');
var User = require('../models/user');
var Patient = require('../models/patient');

var urlencodedParser = bodyParser.urlencoded({ extended: false })
module.exports = function(app)
{
    app.get('/',function(req,res){
        fs.readFile('views/help.html', function(err, data) {
			res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
			res.write(data);
			res.end();
	 	});
    });

	app.get('/success', urlencodedParser,function(req,res){
		/*var usr = JSON.parse(JSON.stringify(req.user));
		wss.on("connection", function(ws) {
			if(usr.master){
  				ws.send("master");
			}
			else
				ws.send("user");
  			ws.on("message", function(message) {
    			console.log("Received: %s", message);
  			});
		});*/
		var times = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth']
        fs.readFile('views/main.html', function(err, data) {
			res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
			var datetime = new Date();
			var month = (datetime.getMonth());
			month += 1;
			var date = (datetime.getDate());
			res.write(month.toString());
			res.write("월");
			res.write(date.toString());
			res.write("일");
			res.write(data);
			/*if(usr.master == true)
				res.write("Logged in as master\n");
			else
				res.write("Logged in as user\n");
			*/res.write('<table>\n<tr>\n <th>Time</th>\n ');
			User.find ({}, function (err, users){
				users.forEach(function(user) {
					if(user.name != 'master'){
						res.write('  <th>');
      					res.write(user.name);
						res.write('</th>');
					}
    			});
				res.write('\n</tr>');
				res.write('\n<tr>\n <th>first</th>\n ');
				users.forEach(function(user) {
					if(user.name != 'master'){
						res.write('  <th>');
      					res.write(user.schedule[0].first);
						res.write('</th>');
					}
    			});
				res.write('\n</tr>');
				res.write('\n<tr>\n <th>second</th>\n ');
				users.forEach(function(user) {
					if(user.name != 'master'){
						res.write('  <th>');
      					res.write(user.schedule[0].second);
						res.write('</th>');
					}
    			});
				res.write('\n</tr>');
				res.write('\n<tr>\n <th>third</th>\n ');
				users.forEach(function(user) {
					if(user.name != 'master'){
						res.write('  <th>');
      					res.write(user.schedule[0].third);
						res.write('</th>');
					}
    			});
				res.write('\n</tr>');
				res.write('\n<tr>\n <th>fourth</th>\n ');
				users.forEach(function(user) {
					if(user.name != 'master'){
						res.write('  <th>');
      					res.write(user.schedule[0].fourth);
						res.write('</th>');
					}
    			});
				res.write('\n</tr>');
				res.write('\n<tr>\n <th>fifth</th>\n ');
				users.forEach(function(user) {
					if(user.name != 'master'){
						res.write('  <th>');
      					res.write(user.schedule[0].fifth);
						res.write('</th>');
					}
    			});
				res.write('\n</tr>');
				res.write('\n</tr>');
				res.write('\n<tr>\n <th>sixth</th>\n ');
				users.forEach(function(user) {
					if(user.name != 'master'){
						res.write('  <th>');
      					res.write(user.schedule[0].sixth);
						res.write('</th>');
					}
    			});
				res.write('\n</tr>');
				res.write('\n</tr>');
				res.write('\n<tr>\n <th>seventh</th>\n ');
				users.forEach(function(user) {
					if(user.name != 'master'){
						res.write('  <th>');
      					res.write(user.schedule[0].seventh);
						res.write('</th>');
					}
    			});
				res.write('\n</tr>');
				res.write('\n<tr>\n <th>eighth</th>\n ');
				users.forEach(function(user) {
					if(user.name != 'master'){
						res.write('  <th>');
      					res.write(user.schedule[0].eighth);
						res.write('</th>');
					}
    			});
				res.write('\n</tr>');
				res.write('\n<tr>\n <th>ninth</th>\n ');
				users.forEach(function(user) {
					if(user.name != 'master'){
						res.write('  <th>');
      					res.write(user.schedule[0].ninth);
						res.write('</th>');
					}
    			});
				res.write('\n</tr>');
				res.write('\n</tr>');
				res.write('\n</tr>');
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
					if(user.name != 'master'){
						res.write("<option value=\"");
      					res.write(user.name);
						res.write("\">");
						res.write(user.name);
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

	app.get('/exchange',function(req,res){
        fs.readFile('views/exchange.html', function(err, data) {
			res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
			res.write(data)
			User.find ({}, function (err, users){
				users.forEach(function(user) {
					if(user.name != 'master'){
						res.write('<option value=');
						res.write('"')
						res.write(user.name)
						res.write('">')
      					res.write(user.name);
						res.write('</option>\n')
					}
    			});
			res.write('</select><select name = "user1_time"><option value="first">first</option><option value="second">second</option><option value="third">third</option></select>')
			res.write('<br>User2<br>')
			res.write('<select name = "user2"')
				users.forEach(function(user) {
					if(user.name != 'master'){
						res.write('<option value=');
						res.write('"')
						res.write(user.name)
						res.write('">')
      					res.write(user.name);
						res.write('</option>\n')
					}
    			});
			res.write('</select><select name = "user2_time"><option value="first">first</option><option value="second">second</option><option value="third">third</option></select>')
				res.write('<br><input type="submit" value="change"><br></form>')
				res.end();
			});	
	 	});
    });

	app.get('/register_patient',function(req,res){
        fs.readFile('views/register_patient.html', function(err, data) {
			res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
			res.write(data);
			res.end();
	 	});
    });

	app.get('/register_doctor',function(req,res){
        fs.readFile('views/register_doctor.html', function(err, data) {
			res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
			res.write(data);
			res.end();
	 	});
    });

	app.get('/view_patient',function(req,res){
		res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
		res.write('<table><tr><th>이름</th></tr>');
		Patient.find ({}, function (err, patients){
				patients.forEach(function(user) {
					res.write('<tr><th>')
      				res.write(user.name);
					res.write('</th>')
					res.write('</tr>')
    			});
				res.write('</table><h3>환자 삭제하기</h3>')
				res.write('<form action="/erase_patient" method="post">')
				res.write('<select name="user">')
				patients.forEach(function(user) {
					if(user.name != 'master'){
						res.write('<option value=');
						res.write('"')
						res.write(user.name)
						res.write('">')
      					res.write(user.name);
						res.write('</option>\n')
					}
    			});
				res.write('</select>')
				res.write('<input type="submit" value="삭제하기"/></form>')
				res.end();
		})
    });

	app.post('/erase_patient', urlencodedParser, function(req,res){
		Patient.remove({ 'name' : req.body.user }, function(err, user) {
			console.log('Removed')
			res.redirect('/view_patient')
		});			
	})

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

	app.post('/register_doctor', urlencodedParser, function(req,res){
		User.findOne({ 'name' : req.body.name }, function(err, user) {
			console.log(user)
			if (user != null){
				res.redirect('/register_doctor_fail')
				return
			}	
			var newUser = new User();
			newUser.name = req.body.name;
			newUser.certificate = req.body.certificate;
			newUser.master = false;
			var newSchedule = {
				"day": "NONE",
				"first": "NONE",
				"second": "NONE",
				"third": "NONE",
				"fourth": "NONE",
				"fifth": "NONE",
				"sixth": "NONE",
				"seventh": "NONE",
				"eighth": "NONE",
				"ninth": "NONE",
			};
			newUser.schedule.push(newSchedule);
			newUser.save(function(err) {
        		if (err)
            		res.redirect('/register_doctor_fail')
       	 	});
			res.redirect('/register_doctor_success')
		})
	})

	app.get('/register_doctor_success',function(req,res){
		res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
		res.write('Success');
		res.end();
    });

	app.get('/register_doctor_fail',function(req,res){
		res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
		res.write('Fail');
		res.end();
    });

	app.get('/view_doctors',function(req,res){
		res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
		res.write('<table><tr><th>이름</th><th>자격증</th></tr>');
		User.find ({}, function (err, users){
				users.forEach(function(user) {
					res.write('<tr><th>')
      				res.write(user.name);
					res.write('</th><th>')
					if (user.certificate == true){
						res.write('O')
					}
					else{
						res.write('X')
					}
					res.write('</th></tr>')
    			});
				res.write('</table><h3>의사 삭제하기</h3>')
				res.write('<form action="/erase_doctor" method="post">')
				res.write('<select name="user">')
				users.forEach(function(user) {
					if(user.name != 'master'){
						res.write('<option value=');
						res.write('"')
						res.write(user.name)
						res.write('">')
      					res.write(user.name);
						res.write('</option>\n')
					}
    			});
				res.write('</select>')
				res.write('<input type="submit" value="삭제하기"/></form>')
				res.end();
		})
    });

	app.post('/erase_doctor', urlencodedParser, function(req,res){
		User.remove({ 'name' : req.body.user }, function(err, user) {
			console.log('Removed')
			res.redirect('/view_doctors')
		});			
	})

	app.post('/add_schedule', urlencodedParser, function(req,res){
		console.log(req.body);
		User.findOne({ 'name' : req.body.user }, function(err, user) {
			console.log(user)
			var usr = req.body.user;
			var time = req.body.time;
			user.schedule[0][time] = req.body.name;
			User.findOneAndUpdate({ 'name' : req.body.user }, user, {upsert:true}, function(err, doc){
    			if (err) console.log(err)
				console.log('updated schedule')
				res.redirect('/success');
			});
		});			
	})

	app.post('/move_date', urlencodedParser, function(req,res){
		/*var usr = JSON.parse(JSON.stringify(req.user));
		wss.on("connection", function(ws) {
			if(usr.master){
  				ws.send("master");
			}
			else
				ws.send("user");
  			ws.on("message", function(message) {
    			console.log("Received: %s", message);
  			});
		})*/;
		var times = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth']
        fs.readFile('views/main.html', function(err, data) {
			res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
			var datetime = new Date();
			var month = (datetime.getMonth());
			month += 1;
			var date = (datetime.getDate());
			res.write(req.body.month.toString());
			res.write("월");
			res.write(req.body.date.toString());
			res.write("일");
			res.write(data);
			/*if(usr.master == true)
				res.write("Logged in as master\n");
			else
				res.write("Logged in as user\n");
			*/res.write('<table>\n<tr>\n <th>Time</th>\n ');
			User.find ({}, function (err, users){
				users.forEach(function(user) {
					if(user.name != 'master'){
						res.write('  <th>');
      					res.write(user.name);
						res.write('</th>');
					}
    			});
				res.write('\n</tr>');
				res.write('\n<tr>\n <th>first</th>\n ');
				users.forEach(function(user) {
					if(user.name != 'master'){
						res.write('  <th>');
      					res.write(user.schedule[0].first);
						res.write('</th>');
					}
    			});
				res.write('\n</tr>');
				res.write('\n<tr>\n <th>second</th>\n ');
				users.forEach(function(user) {
					if(user.name != 'master'){
						res.write('  <th>');
      					res.write(user.schedule[0].second);
						res.write('</th>');
					}
    			});
				res.write('\n</tr>');
				res.write('\n<tr>\n <th>third</th>\n ');
				users.forEach(function(user) {
					if(user.name != 'master'){
						res.write('  <th>');
      					res.write(user.schedule[0].third);
						res.write('</th>');
					}
    			});
				res.write('\n</tr>');
				res.write('\n<tr>\n <th>fourth</th>\n ');
				users.forEach(function(user) {
					if(user.name != 'master'){
						res.write('  <th>');
      					res.write(user.schedule[0].fourth);
						res.write('</th>');
					}
    			});
				res.write('\n</tr>');
				res.write('\n<tr>\n <th>fifth</th>\n ');
				users.forEach(function(user) {
					if(user.name != 'master'){
						res.write('  <th>');
      					res.write(user.schedule[0].fifth);
						res.write('</th>');
					}
    			});
				res.write('\n</tr>');
				res.write('\n</tr>');
				res.write('\n<tr>\n <th>sixth</th>\n ');
				users.forEach(function(user) {
					if(user.name != 'master'){
						res.write('  <th>');
      					res.write(user.schedule[0].sixth);
						res.write('</th>');
					}
    			});
				res.write('\n</tr>');
				res.write('\n</tr>');
				res.write('\n<tr>\n <th>seventh</th>\n ');
				users.forEach(function(user) {
					if(user.name != 'master'){
						res.write('  <th>');
      					res.write(user.schedule[0].seventh);
						res.write('</th>');
					}
    			});
				res.write('\n</tr>');
				res.write('\n<tr>\n <th>eighth</th>\n ');
				users.forEach(function(user) {
					if(user.name != 'master'){
						res.write('  <th>');
      					res.write(user.schedule[0].eighth);
						res.write('</th>');
					}
    			});
				res.write('\n</tr>');
				res.write('\n<tr>\n <th>ninth</th>\n ');
				users.forEach(function(user) {
					if(user.name != 'master'){
						res.write('  <th>');
      					res.write(user.schedule[0].ninth);
						res.write('</th>');
					}
    			});
				res.write('\n</tr>');
				res.write('\n</tr>');
				res.write('\n</tr>');
				res.write('\n</tr>');
				res.write('</table>');
				res.end();
			});	
	 	});
	})

	app.post('/signup_patient', urlencodedParser, function(req,res){
		console.log(req.body);
		var newPatient = new Patient();
		newPatient.name = req.body.name;
		newPatient.gender = req.body.gender;
		newPatient.ndt = req.body.ndt;
		newPatient.gait = req.body.gait;
		newPatient.mat = req.body.mat;
		newPatient.heat = req.body.heat;
		newPatient.water = req.body.water;
		newPatient.save(function(err) {
                    if (err)
                        throw err;
                });
		res.redirect('/');	
	})

	app.get('/algorithm', function(req, res){
		Patient.find ({}, function (err, patients){
			patients.forEach(function(patient) {
				console.log(patient.name)
				User.find ({}, function (err, users){
					users.forEach(function(user) {
						if(user.certificate == true && patient.ndt == true){
							if(user.schedule[0].first == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].first = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].second == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].second = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].third == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].third = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].fourth == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].fourth = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].fifth == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].fifth = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].sixth == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].sixth = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].seventh == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].seventh = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].eighth == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].eighth = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].ninth == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].ninth = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
						}
					});
				});	
			});
		});

		Patient.find ({}, function (err, patients){
			patients.forEach(function(patient) {
				console.log(patient.name)
				User.find ({}, function (err, users){
					users.forEach(function(user) {
						if(user.certificate == false && patient.gait == true){
							if(user.schedule[0].first == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].first = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].second == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].second = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].third == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].third = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].fourth == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].fourth = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].fifth == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].fifth = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].sixth == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].sixth = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].seventh == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].seventh = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].eighth == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].eighth = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].ninth == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].ninth = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
						}
					});
				});	
			});
		});

		Patient.find ({}, function (err, patients){
			patients.forEach(function(patient) {
				console.log(patient.name)
				User.find ({}, function (err, users){
					users.forEach(function(user) {
						if(user.certificate == false && patient.mat == true){
							if(user.schedule[0].first == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].first = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].second == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].second = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].third == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].third = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].fourth == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].fourth = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].fifth == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].fifth = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].sixth == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].sixth = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].seventh == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].seventh = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].eighth == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].eighth = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].ninth == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].ninth = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
						}
					});
				});	
			});
		});

		Patient.find ({}, function (err, patients){
			patients.forEach(function(patient) {
				console.log(patient.name)
				User.find ({}, function (err, users){
					users.forEach(function(user) {
						if(user.certificate == false && patient.heat == true){
							if(user.schedule[0].first == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].first = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].second == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].second = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].third == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].third = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].fourth == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].fourth = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].fifth == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].fifth = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].sixth == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].sixth = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].seventh == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].seventh = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].eighth == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].eighth = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].ninth == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].ninth = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
						}
					});
				});	
			});
		});

		Patient.find ({}, function (err, patients){
			patients.forEach(function(patient) {
				console.log(patient.name)
				User.find ({}, function (err, users){
					users.forEach(function(user) {
						if(user.certificate == false && patient.water == true){
							if(user.schedule[0].first == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].first = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].second == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].second = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].third == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].third = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].fourth == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].fourth = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].fifth == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].fifth = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].sixth == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].sixth = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].seventh == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].seventh = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].eighth == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].eighth = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].ninth == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].ninth = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
						}
					});
				});	
			});
		});

		Patient.find ({}, function (err, patients){
			patients.forEach(function(patient) {
				console.log(patient.name)
				User.find ({}, function (err, users){
					users.forEach(function(user) {
						if(user.certificate == false && patient.hand == true){
							if(user.schedule[0].first == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].first = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].second == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].second = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].third == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].third = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].fourth == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].fourth = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].fifth == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].fifth = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].sixth == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].sixth = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].seventh == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].seventh = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].eighth == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].eighth = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].ninth == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].ninth = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
						}
					});
				});	
			});
		});

		Patient.find ({}, function (err, patients){
			patients.forEach(function(patient) {
				console.log(patient.name)
				User.find ({}, function (err, users){
					users.forEach(function(user) {
						if(user.certificate == false && patient.sca == true){
							if(user.schedule[0].first == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].first = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].second == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].second = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].third == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].third = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].fourth == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].fourth = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].fifth == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].fifth = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].sixth == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].sixth = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].seventh == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].seventh = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].eighth == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].eighth = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
							else if(user.schedule[0].ninth == 'NONE'){
								User.findOne({ 'name' : user.name }, function(err, user) {
									console.log(user)
									user.schedule[0].ninth = patient.name;
									User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    									if (err) console.log(err)
											console.log('updated schedule')
									});
								});
							}
						}
					});
				});	
			});
		});
		res.redirect('/success');	
	})

	app.get('/reset', function(req, res){
		User.find ({}, function (err, users){
			users.forEach(function(user) {
				if(user.name != "master"){
				user.schedule[0].first = "NONE"; 
				user.schedule[0].second = "NONE";
				user.schedule[0].third = "NONE";
				user.schedule[0].fourth = "NONE";
				user.schedule[0].fifth = "NONE";
				user.schedule[0].sixth = "NONE";
				user.schedule[0].seventh = "NONE";
				user.schedule[0].eighth = "NONE";
				user.schedule[0].ninth = "NONE";

				User.findOneAndUpdate({ 'name' : user.name }, user, {upsert:true}, function(err, doc){
    				if (err) console.log(err)
				});		
				}		
			});
			res.redirect('/success');
		});	
	})
}
