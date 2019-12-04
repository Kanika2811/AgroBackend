var mysql = require('mysql');
var dbconfig = require('../../../config/database');
var connection = mysql.createConnection(dbconfig.connection);
const express = require('express');
const router = express.Router();
connection.query('USE ' + dbconfig.database);
var CommonComponent = require("../../../config/CommonComponent");

router.get('/redeemHistory',function(req,res){
    CommonComponent.verifyToken(req,res);
    let tokens = req.headers['authorization'];
    tokens = tokens.substr(7);
    connection.query("SELECT * FROM users where token=?",[tokens] ,function(err, rows,field) {
        if (err)
            return  res.json({status:false,message:"getting error",error:err});
        if (rows.length) {
            let user_id = rows[0].id;
            connection.query("SELECT * FROM redeem_history where user_id=?",[user_id],function(err, rows,field) {
                if (err)
                    return  res.json({status:false,message:"getting error",error:err});
                if(rows.length)
                {
                    let obj ={};
                    let Home_data =[];
                    let i;
                    for(i=0;i<rows.length;i++)
                    {
                        if(rows[i].delete_flag==1)
                        rows[i].delete_flag =true;
                        else
                        rows[i].delete_flag =false;
                        Home_data.push({"redeem_id":rows[i].redeem_id,"redeem_amount":rows[i].redeem_amount,"from_company":rows[i].from_company,
                        "transaction_id":rows[i].transaction_id,"created_timestamp":rows[i].created_timestamp,"updated_timestamp":rows[i].updated_timestamp,
                        "delete_flag":rows[i].delete_flag
                    })
                        
                    }
                    if(i==rows.length)
                    {
                        return  res.json({status:true,message:"Get successfully redeem history...",data:Home_data});
                    }
                }
                else{
                    return  res.json({status:false,message:"This user don't redeem any wallet amount.."});
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