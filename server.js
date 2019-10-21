// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app      = express();
var port     = process.env.PORT || 8080;
const verifyUser = require('./app/routes/user/verifyUser.js');
const userClass = require('./app/routes/UserClass/UserClass.js');
const allCityState = require('./app/routes/user/allcitystate.js');
const resendOTP = require('./app/routes/user/resendotp.js');

var passport = require('passport');
var flash    = require('connect-flash');

const apiVersion = '/api/v1'
require('./config/passport')(passport); // pass passport for configuration



app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
	secret: 'vidyapathaisalwaysrunning',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(apiVersion,verifyUser);
app.use(apiVersion,userClass);
app.use(apiVersion,allCityState);
app.use(apiVersion,resendOTP);



require('./app/routes/user/user.js')(app, passport); // load our routes and pass in our app and fully configured passport
require('./app/routes/chapters/chapter.js')(app);
require('./app/routes/topics/topic.js')(app);
app.listen(port);
console.log('The magic happens on port ' + port);
