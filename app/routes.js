// app/routes.js
var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
var dateTime = require('node-datetime');
var dt = dateTime.create();
dt.format('Y-m-d H:M:S');

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
		 passport.authenticate('local-login', function(err,user,done) {
		if (err) { return next(err); }
		if (!user) { return res.json({"status":200,"Message":"User Not Found!!!!","data" :""}); }
		else { return res.json(user);}
	  })(req,res,next)
	});

	app.post('/signup',	 function(req, res, next) {
		let sql ;
		if(req.body.login_state=="user")
		{
			passport.authenticate('local-signup', function(err, user, done) {
				if (err) { return next(err); }
				if (!user) { return res.redirect('/signup/failurejson'); }
				else { return res.json(user);}
			  })(req, res, next);
		}
		if(req.body.login_state=="personal")
		{
			 sql = 'UPDATE users SET name = ?, dob=?, guardian_name=?, guardian_contact_no=?, user_city=?, user_state=?, pincode=?,updated_timestamp=? WHERE contact_no = ?';
			connection.query(sql,[req.body.name,req.body.dob,req.body.guardian_name,req.body.guardian_contact_no,req.body.user_city,req.body.user_state,req.body.pincode,new Date(dt.now()),req.body.contact_no],function(err,rows,field){
				if(!!err) { console.log('error in this query'+err); }
				else{ console.log('success'); }
			});
		}
		if(req.body.login_state=="profile_image")
		{
			sql = 'UPDATE users SET profile_image = ?, updated_timestamp=? WHERE contact_no = ?';
			connection.query(sql,[req.body.profile_image,new Date(dt.now()),req.body.contact_no],function(err,rows,field){
				if(!!err) { console.log('error in this query'+err); }
				else{ console.log('success'); }
			});
		}
		if(req.body.login_state=="education")
		{
			sql = 'UPDATE users SET school_name = ?, user_class=?, board=?, medium=?, stream=?, updated_timestamp=? WHERE contact_no = ?';
			connection.query(sql,[req.body.school_name,req.body.user_class,req.body.board,req.body.medium,req.body.stream,new Date(dt.now()),req.body.contact_no],function(err,rows,field){
				if(!!err) { console.log('error in this query'+err); }
				else{ console.log('success'); }
			});
		}
		connection.query("SELECT * FROM users where contact_no=?",req.body.contact_no, function(error,rows,fields){
			if(!!error){
			  console.log('error in this query');
			} else{
			  res.json({
			   "status":200,
			   "Message":"successfully store Data",
				"data" :rows[0]
				  });
			}
		  });
	});


	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/signup/successjson',
		failureRedirect : '/signup/failurejson',
		failureFlash : true
		}));


	  // return messages for signup users
	  app.get('/signup/successjson', function(req, res) {
		//	console.log(res);
		connection.query("SELECT * FROM users WHERE email_id = 'rohit'", function(err, rows) {
			if(!err) {
				res.json({ message: 'Successfully created user',"data":rows[0] });
			} else {
			  console.log(err);
			}
		  });
	  });

	  app.get('/signup/failurejson', function(req, res) {
		res.json({ message: 'This user already exists',"data":[] });
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
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}



