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


router.get('/search',function(req,res){
    CommonComponent.verifyToken(req,res);
    let assess = {
        search_video
    } = req.query;
    if (!(typeof search_video === 'string')) {
        return res.json({"status":false,"message":"Invalid data provided"});
    }

    if(search_video == '' || search_video === undefined){
        return res.json({status:false,message:"Please Provide video id",data:""});
    }
    let tokens = req.headers['authorization'];
    tokens = tokens.substr(7);
    connection.query("SELECT * FROM users where token=?",[tokens] ,function(err, rows,field) {
        if (err)
            return  res.json({status:false,message:"getting error",error:err});
        if (rows.length) {
            connection.query("SELECT * FROM videos where video_name LIKE '%"+search_video+"%'" ,function(err, rows,field) {
                if (err)
                    return  res.json({status:false,message:"getting error",error:err});
                if (rows.length) {
                    for(let i=0;i<rows.length;i++)
                    {
                        if(rows[i].delete_flag==1)
                        rows[i].delete_flag=true;
                        else
                        rows[i].delete_flag=false;
                    }
                    return  res.json({status:true,message:"Get successfully searching result...",data:rows});
                }
                else{
                    return  res.json({status:false,message:"Sorry..No match found!! :("});
                }
            });
        }
        else{
            return  res.json({status:false,message:"This user Token is not Exist.."});
        }
    });

});

module.exports = router;
