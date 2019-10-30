const express = require('express');
const router = express.Router();
var mysql = require('mysql');
var dbconfig = require('../../../config/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);
const SendOtp = require('sendotp');
var Constants = require('../../../config/ConstantKeys')
const sendOtp = new SendOtp(Constants.MSG_KEY);
var dateTime = require('node-datetime');
var dt = dateTime.create();
dt.format('Y-m-d H:M:S');

router.post('/resendOTP', async (req, res) => {
    let resendOTP = {
        contact_no,
        } = req.body;
    if (!(typeof contact_no === 'string' )) {
        return res.json({"status":false,"message":"Invalid data provided"});
    }
    if(contact_no == '' || contact_no === undefined){
        return res.json({status:false,Message:"Please Provide Contact Number"});
    }
    connection.query("SELECT * FROM my_schema.users WHERE contact_no = ?",[contact_no], function(err, rows) {
        if (err)
            return done(err);
        if (rows.length) {
            var otp = generate(4);
            sendOtp.send(contact_no, Constants.OTP_SENDER_ID,otp, function (error, data) {
                if(!err){

                    let sql ='UPDATE  users SET otp = ?,is_verified =0, updated_timestamp=? WHERE contact_no = ?';
                    connection.query(sql,[otp,new Date(dt.now()),contact_no], function(err, rows,fields) {
                        if(!err){
                            let user_data =[];
                            let obj ={};
                            
                            obj["contact_no"] =  contact_no;
                            obj["otp"] = otp;
                            user_data.push(obj)
                            
                            return res.json({status:true,Message:"OTP RESEND SUCCESSFULLY!!!",data:user_data});
                        }
                        else{
                            return res.json({"error":err});
                        }
                    });

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

module.exports = router;


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