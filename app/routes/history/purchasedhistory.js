var mysql = require('mysql');
var dbconfig = require('../../../config/database');
var connection = mysql.createConnection(dbconfig.connection);
const express = require('express');
const router = express.Router();
connection.query('USE ' + dbconfig.database);
var CommonComponent = require("../../../config/CommonComponent");

router.get('/purchasedHistory',function(req,res){
    CommonComponent.verifyToken(req,res);
    let tokens = req.headers['authorization'];
    tokens = tokens.substr(7);
    connection.query("SELECT * FROM users where token=?",[tokens] ,function(err, rows,field) {
        if (err)
            return  res.json({status:false,message:"getting error",error:err});
        if (rows.length) {
            let user_id = rows[0].id;
            connection.query("SELECT * FROM purchased_details where user_id=?",[user_id],function(err, rows,field) {
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
                        Home_data.push({"purchased_id":rows[i].purchased_id,"subscription_id":rows[i].subscription_id,"order_id":rows[i].order_id,
                        "transaction_id":rows[i].transaction_id,"amount":rows[i].amount,"invoice_id":rows[i].invoice_id,"created_timestamp":rows[i].created_timestamp,"updated_timestamp":rows[i].updated_timestamp,
                        "delete_flag":rows[i].delete_flag
                    })
                        
                    }
                    if(i==rows.length)
                    {
                        return  res.json({status:true,message:"Get successfully purchased history...",data:Home_data});
                    }
                }
                else{
                    return  res.json({status:false,message:"This user don't  purchased any subscription.."});
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