var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var mysql = require('mysql');
var bcrypt = require('bcrypt');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);
const SendOtp = require('sendotp');
var Constants = require('../config/ConstantKeys')
const sendOtp = new SendOtp(Constants.MSG_KEY);
const jwt = require('jsonwebtoken');
module.exports = function(passport) {
    console.log("message_key"+Constants.MSG_KEY);
    // passport set up; required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        connection.query("SELECT * FROM users WHERE id = ? ",[id], function(err, rows){
            done(err, rows[0]);
        });
    });

    // handles signup
    passport.use(
        'local-signup',
        new LocalStrategy({
            usernameField :'contact_no',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req,username, password, done) {
            connection.query("SELECT * FROM users WHERE contact_no = ?",[username], function(err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                } else {
                     var newUserMysql = {
                        contact_no: username,
                        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))  // use the generateHash function in our user model
                    };
                    var otp = generate(4);
                    const user = {
                        contact_no: username,
                        email_id: req.body.email_id
                    }

                    sendOtp.send(username, "MRB",otp, function (error, data) {
                        console.log("1")
                        jwt.sign({user},'SuperSecRetKey', { expiresIn: 60 }, (err, token) => {
                          if(!err){
                            console.log(req.body.dob)
                            var insertQuery = "INSERT INTO users (name,user_class,dob, password, email_id, contact_no,otp,token,user_city,user_state) values (?,?,?,?,?,?,?,?,?,?)";
                            connection.query(insertQuery,[req.body.name,req.body.user_class,req.body.dob,newUserMysql.password, req.body.email_id,req.body.contact_no,otp,token,req.body.user_city,req.body.user_state],function(err, rows) {
                                console.log(err)
                                newUserMysql.id = rows.insertId;
                                newUserMysql.email_id=req.body.email_id;
                                return done(null, rows[0]);
    
                            });
                          }
                        });
                      });
                }
            });
        })
    );

    // handles login
    passport.use(
        'local-login',
        new LocalStrategy({
            usernameField : 'contact_no',
            passwordField : 'password',
            passReqToCallback : true,failureFlash : true
        },
        function(req, username, password, done) {
            connection.query("SELECT * FROM users WHERE contact_no = ?",[req.body.contact_no], function(err, rows){
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done("User not registered", false, req.flash('loginMessage', 'No user found.'));
                }
                if (!bcrypt.compareSync(password, rows[0].password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                if(rows[0].is_verified === 0){
                    return done("User not verified", false, req.flash('loginMessage', 'Oops! Wrong password.'));
                 }
                return done(null, rows[0]);
            });
        })
    );
};

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