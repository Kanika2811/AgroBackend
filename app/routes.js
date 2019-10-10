// app/routes.js
var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);

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
	app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
		}),
        function(req, res) {
            console.log("hello");

           /* if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');*/
    });

	
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/signup/successjson',
		failureRedirect : '/signup/failurejson',
		failureFlash : true
		}));
	  // return messages for signup users
	  app.get('/signup/successjson', function(req, res) {
		//	console.log(res);
		connection.query("SELECT * FROM users WHERE username = 'rohit'", function(err, rows) {
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



