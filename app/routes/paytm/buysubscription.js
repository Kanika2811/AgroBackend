var mysql = require('mysql');
var dbconfig = require('../../../config/database');
var connection = mysql.createConnection(dbconfig.connection);
const express = require('express');
const router = express.Router();
connection.query('USE ' + dbconfig.database);
var CommonComponent = require("../../../config/CommonComponent");
const paytm = require('./checksum');

router.post('/generateChecksum',function(req,res){
    CommonComponent.verifyToken(req,res);
    let tokens = req.headers['authorization'];
    tokens = tokens.substr(7);
    connection.query("SELECT * FROM users where token=?",[tokens] ,function(err, rows,field) {
        if (err)
            return  res.json({status:false,message:"getting error",error:err});
        if (rows.length) {
            let user_id = rows[0].id;
            let addclass = {
                subscription_id,
                payment_mode
            } = req.body;
           
        
            if(payment_mode == '' || payment_mode === undefined){
                return res.json({status:false,message:"Please Provide Payment Mode",data:""});
            }

            if(subscription_id == '' || subscription_id === undefined){
                return res.json({status:false,message:"Please Provide which subscription plan you want to purchased",data:""});
            }

            /*var ver_param = {
                MID: "STNikm10169772547719",
                ORDER_ID: subscription_id,
                CUST_ID: user_id,
                TXN_AMOUNT: 1,
                CHANNEL_ID: 'WEB',
                INDUSTRY_TYPE_ID: 'Retail',
                WEBSITE: 'WEBSTAGING',
                CHECKSUMHASH: '5xORNy+qP7G53XWptN7dh1AzD226cTTDsUe4yjAgKe19eO5olCPseqhFDmlmUTcSiEJFXuP/usVEjHlfMCgvqtI8rbkoUCVC3uKZzOBFpOw='
            };
            genchecksum(ver_param, ver_param.MID, function (err, res) {
                console.log(res);
            });
            if (verifychecksum(ver_param, ver_param.MID)) {
                console.log('verified checksum');
            } else {
                console.log("verification failed");
            }*/
            paytm.generate_checksum(user_id,req,res,function(req,res){
            });
        }
        else{
            return  res.status(401).send({status:401,message : 'User Unauthorized'})
        }
    });
});

router.post('/VerifedChecksum',function(req,res){
    CommonComponent.verifyToken(req,res);
    let tokens = req.headers['authorization'];
    tokens = tokens.substr(7);
    connection.query("SELECT * FROM users where token=?",[tokens] ,function(err, rows,field) {
        if (err)
            return  res.json({status:false,message:"getting error",error:err});
        if (rows.length) {
            let user_id = rows[0].id;
            let addclass = {
                subscription_id,
                payment_mode,
                checksum
            } = req.body;
           
        
            if(payment_mode == '' || payment_mode === undefined){
                return res.json({status:false,message:"Please Provide Payment Mode",data:""});
            }

            if(subscription_id == '' || subscription_id === undefined){
                return res.json({status:false,message:"Please Provide which subscription plan you want to purchased",data:""});
            }

         
            paytm.verified_checksum(user_id,req,res);
        }
        else{
            return  res.status(401).send({status:401,message : 'User Unauthorized'})
        }
    });
});



module.exports = router;