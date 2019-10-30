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
        current_contact_no,
        new_contact_no
        } = req.body;
    if (!(typeof current_contact_no === 'string' ||
    typeof new_contact_no === 'string')) {
        return res.json({"status":false,"Message":"Invalid data provided"});
    }
    if(current_contact_no == '' || current_contact_no === undefined){
        return res.json({status:false,Message:"Please Provide Current Contact Number"});
    }
    if(new_contact_no == '' || new_contact_no === undefined){
        return res.json({status:false,Message:"Please Provide New Contact Number"});
    }
    connection.query("SELECT * FROM my_schema.users WHERE contact_no = ?",[current_contact_no], function(err, rows) {
        if (err)
            return done(err);
        if (rows.length) {
            let sql ='UPDATE users SET contact_no = ?, updated_timestamp=? WHERE contact_no = ?';
            connection.query(sql, [new_contact_no,new Date(dt.now()),current_contact_no], function (err, rows, fields) {
                if(!!err) {
                     console.log('error in this query'+err); }
                else{
                    connection.query("SELECT * FROM my_schema.users WHERE contact_no = ?",[new_contact_no], function(err, rows) {
                    return res.json({status:true,Message:"Updated Contact Number Successfully!!!",data:rows[0]});
                    });
                }
            });
        } else {
            return res.json({status:false,Message:"This user is not exist."});
        }

    });
});
module.exports = router;