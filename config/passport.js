var LocalStrategy = require('passport-local').Strategy
var User = require('../models/user');
var Schedule = require('../models/schedule');
module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, email, password, done) {
		User.findOne({ 'email' : email }, function(err, user) {

            if (err) return done(err);
            if (user) {
                return done(null, false, req.flash('signupMessage', '이메일이 존재합니다.'));
            } else {
                var newUser = new User();
                newUser.name = req.body.name;
                newUser.email = email;
                newUser.password = newUser.generateHash(password); 
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
                        throw err;
                    return done(null, newUser);
                });
            }
        });
    }));

    passport.use('login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, email, password, done) { 
        User.findOne({ 'email' : email }, function(err, user) {
            if (err)
                return done(err);
            if (!user)
                return done(null, false, req.flash('loginMessage', '사용자를 찾을 수 없습니다.'));
            if (!user.validPassword(password, user))
                return done(null, false, req.flash('loginMessage', '비밀번호가 다릅니다.')); 
            return done(null, user);
        });
    }));
};
