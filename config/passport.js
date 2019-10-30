var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var mysql = require('mysql');
var bcrypt = require('bcrypt');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);
var dateTime = require('node-datetime');
var dt = dateTime.create();
dt.format('Y-m-d H:M:S');
const SendOtp = require('sendotp');
var Constants = require('../config/ConstantKeys')
const sendOtp = new SendOtp(Constants.MSG_KEY);
const jwt = require('jsonwebtoken');
module.exports = function(passport) {
   // console.log("message_key"+Constants.MSG_KEY);
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
                    return done(null,false);
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
                    sendOtp.send(username, Constants.OTP_SENDER_ID,otp, function (error, data) {
                        jwt.sign({user},'SuperSecRetKey', { expiresIn: 60 }, (err, token) => {
                          if(!err){
                              
                            var insertQuery = "INSERT INTO users (name,gender,dob, password, email_id, contact_no,token,otp,user_class,user_city,user_state) values (?,?,?,?,?,?,?,?,?,?,?)";
                            connection.query(insertQuery,[req.body.name,req.body.gender,req.body.dob,newUserMysql.password, req.body.email_id,username,token,otp,req.body.user_class,req.body.user_city,req.body.user_state],function(err, rows) {
                                connection.query("SELECT * FROM users WHERE contact_no = ?",[username], function(err, rows) {
                                    
                                    let obj ={};
                                    
                                    obj["contact_no"] =  rows[0].contact_no;
                                    obj["otp"] = rows[0].otp;
                                    
                                    return done(null, obj);
                                });
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
            connection.query("SELECT * FROM users WHERE contact_no = ? ",[username], function(err, rows){
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

    //Forgot password 
    passport.use(
        'local-forgot-password',
        new LocalStrategy({
            usernameField : 'contact_no',
            passwordField : 'new_password',
            passReqToCallback : true
        },
        function(req,username,password,done){
            var newUserMysql = {
                contact_no: username,
                password: bcrypt.hashSync(req.body.new_password, bcrypt.genSaltSync(10))  // use the generateHash function in our user model
            };
            var insertQuery = 'UPDATE users SET password = ?, is_verified = ?, updated_timestamp = ? WHERE contact_no=?';
            connection.query(insertQuery,[newUserMysql.password,req.body.is_otp_verified,new Date(dt.now()),newUserMysql.contact_no],function(err, rows) {
                if(err) {
                    return done(err); 
                }
                else{
                    
                    return done(null, newUserMysql);
                }
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