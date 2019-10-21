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
        current_contactno,
        new_contactno
        } = req.body;
    if (!(typeof current_contactno === 'string' ||
    typeof new_contactno === 'string')) {
        return res.json({"status":false,"message":"Invalid data provided"});
    }
    if(current_contactno == '' || current_contactno === undefined){
        return res.json({status:false,Message:"Please Provide Current Contact Number"});
    }
    if(new_contactno == '' || new_contactno === undefined){
        return res.json({status:false,Message:"Please Provide New Contact Number"});
    }
    current_contactno = "91"+current_contactno;
    new_contactno = "91"+new_contactno;
    connection.query("SELECT * FROM my_schema.users WHERE contact_no = ?",[current_contactno], function(err, rows) {
        if (err)
            return done(err);
        if (rows.length) {
            let sql ='UPDATE users SET contact_no = ?, updated_timestamp=? WHERE contact_no = ?';
            connection.query(sql, [new_contactno,new Date(dt.now()),current_contactno], function (err, rows, fields) {
                if(!!err) {
                     console.log('error in this query'+err); }
                else{
                    return res.json({status:true,Message:"Updated Contact Number Successfully!!!",data:rows[0]});
                }
            });
        } else {
            return res.json({status:false,Message:"This user is not exist."});
        }

    });
});
module.exports = router;