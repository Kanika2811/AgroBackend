var mysql = require('mysql');
var dbconfig = require('../../../config/database');
var connection = mysql.createConnection(dbconfig.connection);
var dateTime = require('node-datetime');
var dt = dateTime.create();
dt.format('Y-m-d H:M:S');
const express = require('express');
const router = express.Router();
connection.query('USE ' + dbconfig.database);
var CommonComponent = require("../../../config/CommonComponent");


router.get('/assessment',function(req,res){
    CommonComponent.verifyToken(req,res);
    let assess = {
        video_id
    } = req.body;
    if (!(typeof video_id === 'string')) {
        return res.json({"status":false,"message":"Invalid data provided"});
    }

    if(video_id == '' || video_id === undefined){
        return res.json({status:false,message:"Please Provide video id",data:""});
    }
    let tokens = req.headers['authorization'];
    tokens = tokens.substr(7);
    connection.query("SELECT * FROM users where token=?",[tokens] ,function(err, rows,field) {
        if (err)
            return  res.json({status:false,message:"getting error",error:err});
        if (rows.length) {
            connection.query("SELECT assessment_id,video_id,question,option_1,option_2,option_3,option_4,option_5,correct_answer,created_timestamp,updated_timestamp,delete_flag FROM assessment where video_id=?",[video_id],function(err, rows,field) {
                if (err)
                    return  res.json({status:false,message:"getting error",error:err});
                if(rows.length)
                {
                    for(let i=0;i<rows.length;i++)
                    {
                        if(rows[i].delete_flag==1)
                        rows[i].delete_flag=true;
                        else
                        rows[i].delete_flag=false;
                    }
                    return  res.json({status:true,message:"Get successfully assessment...",data:rows});
                }
                else{
                    return  res.json({status:false,message:"This video dont have assessment.."});
                }
            });
        }
        else{
            return  res.json({status:false,message:"This user Token is not Exist.."});
        }
    });

});

module.exports = router;
