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
	app.post('/api/v1/login',function(req,res,next){
		passport.authenticate('local-login', function(err,user,req) {
		if (err) {
			return res.json({"status":false,"message":err});
		}
		if (!user) {
			return res.json({"status":false,"message":"User Not Found!!!!"});
		}
		else {
			 return res.json({"status":true,"message":"User login successfully","data":user});}
	  })(req,res,next)
	});

	app.post('/api/v1/signup',function(req,res,next){
		let signup = {
			name,
			gender,
			dob,
			password,
			email_id,
			contact_no,
			user_class,
			user_city,
			user_state
			} = req.body;
		if (!(typeof name === 'string' ||
		typeof gender === 'string' ||
		typeof dob === 'string' ||
		typeof password === 'string' ||
		typeof email_id === 'string' ||
		typeof contact_no === 'string' ||
		typeof user_class === 'string' ||
		typeof user_city === 'string' ||
		typeof user_state === 'string' )) {
			return res.json({"status":false,"message":"Invalid data provided"});
		}
		if(name == '' || name === undefined){
			return res.json({status:false,message:"Please Enter Your Full Name"});
		}
		if(gender == '' || gender === undefined){
			return res.json({status:false,message:"Please Select Your Gender"});
		}
		if(dob == '' || dob === undefined){
			return res.json({status:false,message:"Please Enter Your Date of Birth"});
		}
		if(password == '' || password === undefined){
			return res.json({status:false,message:"Please Enter Your Password"});
		}
		if(email_id == '' || email_id === undefined){
			return res.json({status:false,message:"Please Enter Your Email Address"});
		}
		if (!validateEmail(email_id)) {
			return res.json({status:false,message:"Please Enter Valid Email Address"});
		}
		if(contact_no == '' || contact_no === undefined){
			return res.json({status:false,message:"Please Enter Contact Number"});
		}
		if(user_class == '' || user_class === undefined){
			return res.json({status:false,message:"Please Select Your Class"});
		}
		if(user_state == '' || user_state === undefined){
			return res.json({status:false,message:"Please Select Your State"});
		}
		if(user_city == '' || user_city === undefined){
			return res.json({status:false,message:"Please Select Your State"});
		}

		passport.authenticate('local-signup', function(err,user,req) {
			if (err) {
				return res.json({"status":false,"message":err});
			}
			if (!user) {
				return res.json({"status":false,'message':'This username is already taken.'});
			}
			else {
				 return res.json({"status":true,"message":"Please Verified Your OTP","data":user});}
		  })(req,res,next)


	});

	  // return messages for signup users
	  app.get('/api/v1/signup/successjson', function(req, res) {
          res.json({ message: 'Successfully created user'});

	  });

	  app.get('/api/v1/signup/failurejson', function(req, res) {
		return res;
	  });
	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/api/v1/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/api/v1/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	app.post('/api/v1/upload',upload.single('file'),function(req,res,err) {
		if(!req.file) {
			res.json({ message:err,"data":''});
		  }
		  else{
			res.json({ message: 'Video Upload successfully!!!',"data":'' });
		  }

	});
	app.get('/api/v1/forgotPassword', async (req, res) => {
		let forgotPassword = {
			contact_no,
			} = req.body;
		if (!(typeof contact_no === 'string' )) {
			return res.json({"status":false,"message":"Invalid data provided"});
		}
		if(contact_no == '' || contact_no === undefined){
			return res.json({status:false,message:"Please Provide Contact Number"});
		}
		connection.query("SELECT * FROM my_schema.users WHERE contact_no = ?",[contact_no], function(err, rows) {
			if (err)
				return done(err);
			if (rows.length) {
				var otp = generate(4);
				sendOtp.send(contact_no, Constants.OTP_SENDER_ID,otp, function (error, data) {
					if(!err){
	
						let sql ='UPDATE  users SET otp = ?, updated_timestamp=? WHERE contact_no = ?';
						connection.query(sql,[otp,new Date(dt.now()),contact_no], function(err, rows,fields) {
							if(!err){
								
								let obj ={};
								
								obj["contact_no"] =  contact_no;
								obj["otp"] = otp;
								
								
								return res.json({status:true,message:"Forgot Password OTP RESEND SUCCESSFULLY!!!",data:obj});
							}
							else{
								return res.json({"error":err});
							}
						});
	
					}
					else{
						return res.json({status:false,message:"Please Check Contact Number."});
					}
				})
			} else {
				return res.json({status:false,message:"This user is not exist."});
			}
		 });
	
	});


	app.put('/api/v1/forgotPassword',  function(req, res, next) {
		let forgotPassword = {
			contact_no,
			otp,
			new_password
			} = req.body;
		if (!(typeof contact_no === 'string' ||
		typeof otp === 'string' ||
		typeof new_password === 'string')) {
			return res.json({"status":false,"message":"Invalid data provided"});
		}
		if(contact_no == '' || contact_no === undefined){
			return res.json({status:false,message:"Please Provide Contact Number"});
		}
		if(otp == '' || otp === undefined){
			return res.json({status:false,message:"Please Provide OTP "});
		}
		if(new_password == '' || new_password === undefined){
			return res.json({status:false,message:"Please Provide New Password"});
		}
		connection.query("SELECT * FROM my_schema.users WHERE contact_no = ?",[contact_no], function(err, rows) {
			if (err)
				return done(err);
			if (rows.length) {
				if(otp == rows[0].otp){
					
					passport.authenticate('local-forgot-password', function(err, user, done) {
						if (err) {
						return next(err); 
						}
						if (!user) {
							return res.json({status:false,message:"Please provide correct information"});
						}
						else {
							return res.json({status:true,message:"Password Updated Successfully",data:user});
						}
					})(req, res);
				}
				else{
					return res.json({status:false,message:"OTP is not Verified. Please Check Again"});
				}

			} else {
				return res.json({status:false,message:"This user is not exist."});
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


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}