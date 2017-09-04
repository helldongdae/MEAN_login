var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var passport = require('passport');
mongoose.connect('mongodb://localhost/test', { useMongoClient: true }); 
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log("mongo DB connected...")
});

var session = require('express-session');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

var flash = require('connect-flash');
app.use(flash());

require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session()); 

var router = require('./routes/index')(app);

var server = app.listen(8080, function(){
    console.log("Express server has started on port 8080")
})

