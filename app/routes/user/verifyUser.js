
const express = require('express');
const router = express.Router();

var mysql = require('mysql');
var dbconfig = require('../../../config/database');
var connection = mysql.createConnection(dbconfig.connection);
var dateTime = require('node-datetime');
var dt = dateTime.create();
dt.format('Y-m-d H:M:S');
connection.query('USE ' + dbconfig.database);

router.post('/VerifyOTP', async (req, res) => {

    let addclass = {
        contact_no,
        otp
        } = req.body;
    if (!(typeof contact_no === 'string' ||
    typeof otp === 'string' )) {
        return res.json({"Status":false,"Message":"Invalid data provided"});
    }
    if(contact_no == '' || contact_no === undefined){
        return res.json({Status:false,Message:"Please Provide Contact Number"});
    }
    if(otp == '' || otp === undefined){
        return res.json({Status:false,Message:"Please Provide otp"});
    }

    connection.query("SELECT * FROM my_schema.users WHERE contact_no = ?",[contact_no], function(err, rows) {
       if(err){
           return err;
       }
       if(rows.length){
            if(otp == rows[0].otp){
                let sql ='UPDATE  users SET is_verified = ?,updated_timestamp=? WHERE contact_no = ?';
                connection.query(sql,["1",new Date(dt.now()),contact_no], function(err, rows,fields) {
                    if(!err){
                        connection.query("SELECT * FROM my_schema.users WHERE contact_no = ?",[contact_no], function(err, rows) {
                        return res.json({Status:true,Message:"User verified successfully!!!",data:rows[0]});
                        });
                    }
                    else{
                        return res.json({"error":err});
                    }
            });

            }
            else{
                return res.json({"Status":false,"Message":"Entered Incorrect OTP"});
            }
        }
        else{
            return res.json({Status:false,Message:"This user is not exist."});
       }
    });

});

module.exports = router;