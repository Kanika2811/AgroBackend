const express = require('express');
const router = express.Router();
var mysql = require('mysql');
var dbconfig = require('../../../config/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);
var dateTime = require('node-datetime');
var dt = dateTime.create();
dt.format('Y-m-d H:M:S');

router.put('/editContactNo', async (req, res) => {
    let editno = {
        old_contact_no,
        new_contact_no
        } = req.body;
    if (!(typeof old_contact_no === 'string' ||
    typeof new_contact_no === 'string')) {
        return res.json({"status":false,"message":"Invalid data provided"});
    }
    if(old_contact_no == '' || old_contact_no === undefined){
        return res.json({status:false,message:"Please Provide Current Contact Number"});
    }
    if(new_contact_no == '' || new_contact_no === undefined){
        return res.json({status:false,message:"Please Provide New Contact Number"});
    }
    connection.query("SELECT * FROM my_schema.users WHERE contact_no = ?",[old_contact_no], function(err, rows) {
        if (err)
            return done(err);
        if (rows.length) {
            let sql ='UPDATE users SET contact_no = ?, updated_timestamp=? WHERE contact_no = ?';
            connection.query(sql, [new_contact_no,new Date(dt.now()),old_contact_no], function (err, rows, fields) {
                if (err)
                    return  res.json({status:false,message:"getting error",error:err});
                else{
                    connection.query("SELECT * FROM my_schema.users WHERE contact_no = ?",[new_contact_no], function(err, rows) {
                        rows[0].dob=rows[0].dob.toLocaleString().slice(0,10).replace('/','-').replace('/','-');
                    return res.json({status:true,message:"Updated Contact Number Successfully!!!",data:rows[0]});
                    });
                }
            });
        } else {
            return res.json({status:false,message:"This user is not exist."});
        }

    });
});
module.exports = router;