
const express = require('express');
const router = express.Router();

var mysql = require('mysql');
var dbconfig = require('../../../config/database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

router.post('/VerifyOTP', async (req, res) => {

    let addclass = {
        contact_no,
        otp
        } = req.body;
    if (!(typeof contact_no === 'string' ||
    typeof otp === 'string' )) {
        return res.json({"status":false,"message":"Invalid data provided"});
    }
    connection.query("SELECT otp FROM my_schema.users WHERE contact_no = ?",[contact_no], function(err, rows) {
       if(!err){
            if(otp == rows[0].otp){
                connection.query("UPDATE  my_schema.users SET is_verified = 1 WHERE contact_no = ?",[contact_no], function(err, rows) {
                    if(!err){
                        connection.query("SELECT * FROM my_schema.users WHERE contact_no = ?",[contact_no], function(err, rows) {
                        return res.json({"message":"User verified successfully","data":rows[0]});
                        });
                    }
                    else{
                        return res.json({"error":err});
                    }
            });

            }
            else{
                return res.json({"status":false,"message":"Entered Incorrect OTP"});
            }
       }
    });

});

module.exports = router;