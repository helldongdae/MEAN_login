var passport = require('passport');
var fs = require('fs');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

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

	app.get('/success',function(req,res){
        res.write('SUCCESS');
		res.end();
    });

	app.get('/fail',function(req,res){
		res.write('FAIL');
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
}
