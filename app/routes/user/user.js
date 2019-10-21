// app/routes.js
var mysql = require('mysql');
var dbconfig = require('../../../config/database');
var connection = mysql.createConnection(dbconfig.connection);
var dateTime = require('node-datetime');
var dt = dateTime.create();
dt.format('Y-m-d H:M:S');
const SendOtp = require('sendotp');
var Constants = require('../../../config/ConstantKeys')
const sendOtp = new SendOtp(Constants.MSG_KEY);

const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
	destination:'./upload/',
	filename:function(req,file,cb){
		cb(null,file.originalname);
	}
});

const upload = multer({ storage:storage });


connection.query('USE ' + dbconfig.database);
module.exports = function(app, passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		res.render('index.ejs'); // load the index.ejs file
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	/*app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});*/

	// process the login form
	app.post('/login',function(req,res,next){
		passport.authenticate('local-login', function(err,user,req) {
		if (err) {
			return res.json({"success":false,"Message":err});
		}
		if (!user) {
			return res.json({"success":false,"Message":"User Not Found!!!!"});
		}
		else {
			 return res.json({"success":true,"message":"User login successfully","data":user});}
	  })(req,res,next)
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/signup/successjson',
		failureRedirect : '/signup/failurejson',
		failureFlash : true
		}));


	  // return messages for signup users
	  app.get('/signup/successjson', function(req, res) {
          res.json({ message: 'Successfully created user'});

	  });

	  app.get('/signup/failurejson', function(req, res) {
		return res;
	  });
	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	app.post('/upload',upload.single('file'),function(req,res,err) {
		if(!req.file) {
			res.json({ message:err,"data":''});
		  }
		  else{
			res.json({ message: 'Video Upload successfully!!!',"data":'' });
		  }

	});
	app.get('/forgotPassword', async (req, res) => {
		let forgotPassword = {
			contact_no,
			} = req.body;
		if (!(typeof contact_no === 'string' )) {
			return res.json({"status":false,"message":"Invalid data provided"});
		}
		if(contact_no == '' || contact_no === undefined){
			return res.json({status:false,Message:"Please Provide Contact Number"});
		}
		contact_no = "91"+contact_no;
		connection.query("SELECT * FROM my_schema.users WHERE contact_no = ?",[contact_no], function(err, rows) {
			if (err)
				return done(err);
			if (rows.length) {
				var otp = generate(4);
				sendOtp.send(contact_no, Constants.OTP_SENDER_ID,otp, function (error, data) {
					if(!err){
						rows[0].forgot_password_otp=otp;
						return res.json({status:true,Message:"Forgot Password OTP Send SUCCESSFULLY!!!",data:rows[0]});
					}
					else{
						return res.json({status:false,Message:"Please Check Contact Number."});
					}
				})
			} else {
				return res.json({status:false,Message:"This user is not exist."});
			}
		 });
	
	});


	app.put('/forgotPassword',  function(req, res, next) {
		let forgotPassword = {
			contact_no,
			is_otp_verified,
			new_password
			} = req.body;
		if (!(typeof contact_no === 'string' ||
		typeof is_otp_verified === 'string' ||
		typeof new_password === 'string')) {
			return res.json({"status":false,"message":"Invalid data provided"});
		}
		if(contact_no == '' || contact_no === undefined){
			return res.json({status:false,Message:"Please Provide Contact Number"});
		}
		if(is_otp_verified == '' || is_otp_verified === undefined){
			return res.json({status:false,Message:"Please Provide OTP is Verified on Not"});
		}
		if(new_password == '' || new_password === undefined){
			return res.json({status:false,Message:"Please Provide New Password"});
		}
		connection.query("SELECT * FROM my_schema.users WHERE contact_no = ?",[contact_no], function(err, rows) {
			if (err)
				return done(err);
			if (rows.length) {
				passport.authenticate('local-forgot-password', function(err, user, done) {
					if (err) {
					return next(err); 
					}
					if (!user) {
						return res.json({status:false,Message:"Please provide correct information"});
					}
					else {
					 	return res.json({status:true,message:"Password Updated Successfully",data:user});
					}
				})(req, res);


			} else {
				return res.json({status:false,Message:"This user is not exist."});
			}
		});
	});


};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}


function generate(n) {
    var add = 1, max = 12 - add;
    if ( n > max ) {
            return generate(max) + generate(n - max);
    }
    max        = Math.pow(10, n+add);
    var min    = max/10;
    var number = Math.floor( Math.random() * (max - min + 1) ) + min;

    return ("" + number).substring(add);
}


