var mysql = require('mysql');
var dbconfig = require('../../../config/database');
var connection = mysql.createConnection(dbconfig.connection);
const express = require('express');
const router = express.Router();
connection.query('USE ' + dbconfig.database);
var CommonComponent = require("../../../config/CommonComponent");

router.get('/earnHistory',function(req,res){
    CommonComponent.verifyToken(req,res);
    let tokens = req.headers['authorization'];
    tokens = tokens.substr(7);
    connection.query("SELECT * FROM users where token=?",[tokens] ,function(err, rows,field) {
        if (err)
            return  res.json({status:false,message:"getting error",error:err});
        if (rows.length) {
            let user_id = rows[0].id;
            connection.query("SELECT * FROM earn_history where user_id=?",[user_id],function(err, rows,field) {
                if (err)
                    return  res.json({status:false,message:"getting error",error:err});
                if(rows.length)
                {
                    
                }
                else{

                }
            });
        }
        else
        {
            return  res.status(401).send({status:401,message : 'User Unauthorized'})
        }
    });
});

module.exports = router;