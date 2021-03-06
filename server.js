// server.js

// set up ======================================================================
// get all the tools we need
var swaggerUi =  require('swagger-ui-express');
var swaggerJSDoc = require('swagger-jsdoc');
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
const editContactNo = require('./app/routes/user/editcontactno.js');
const subjects = require('./app/routes/subjects/subject.js');
const profileImage = require('./app/routes/user/userprofileimage.js');
const userHome = require('./app/routes/UserHome/userhome.js');
const chapters = require('./app/routes/chapters/chapter.js');
const chaptervideos=require('./app/routes/chapterVideos/chaptervideos.js');
const like_comment=require('./app/routes/likecommentfavourite/like&comment.js');
const favourite=require('./app/routes/likecommentfavourite/favourite.js');
const assessment=require('./app/routes/assessment/assessment.js');
const search=require('./app/routes/search/search.js');
const userprofile=require('./app/routes/userprofile/profile.js');
const earnhistory=require('./app/routes/history/earnhistory.js');
const redeemhistory=require('./app/routes/history/redeemhistory.js');
const purchasedhistory=require('./app/routes/history/purchasedhistory.js');
const buysubscription=require('./app/routes/paytm/buysubscription.js');


var passport = require('passport');
var flash    = require('connect-flash');

const apiVersion = '/api/v1'
require('./config/passport')(passport); // pass passport for configuration


const swaggerDefinition = {
	info: {
	  title: 'Education System',
	  version: '1.0.0',
	  description: 'Endpoints for Education System',
	},
	host: 'localhost:8080',
	basePath: '/',
	securityDefinitions: {
	  bearerAuth: {
		type: 'apiKey',
		name: 'Authorization',
		scheme: 'bearer',
		in: 'header',
	  },
	},
  };

  const options = {
	swaggerDefinition,
	apis: ['./app/routes/user/*.js','./app/routes/UserClass/*.js','./app/routes/subjects/*.js',,'./app/routes/chapters/*.js'],
  };
  const swaggerSpec = swaggerJSDoc(options);
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
app.use(apiVersion,editContactNo);
app.use(apiVersion,subjects);
app.use(apiVersion,profileImage);
app.use(apiVersion,userHome);
app.use(apiVersion,chapters);
app.use(apiVersion,chaptervideos);
app.use(apiVersion,like_comment);
app.use(apiVersion,favourite);
app.use(apiVersion,assessment);
app.use(apiVersion,search);
app.use(apiVersion,userprofile);
app.use(apiVersion,earnhistory);
app.use(apiVersion,redeemhistory);
app.use(apiVersion,purchasedhistory);
app.use(apiVersion,buysubscription);
app.use(apiVersion+'/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


require('./app/routes/user/user.js')(app, passport); // load our routes and pass in our app and fully configured passport

app.listen(port);
console.log('Server Started at port ' + port);
