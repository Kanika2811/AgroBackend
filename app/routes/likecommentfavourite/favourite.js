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

    

    router.post('/favourite',function(req,res){
        CommonComponent.verifyToken(req,res);
        let addclass = {
            id
        } = req.body;
        if (!(typeof id === 'string')) {
            return res.json({"status":false,"message":"Invalid data provided"});
        }
    
        if(id == '' || id === undefined){
            return res.json({status:false,message:"Please Provide video id",data:""});
        }
        let tokens = req.headers['authorization'];
        tokens = tokens.substr(7);
        connection.query("SELECT * FROM users where token=?",[tokens] ,function(err, rows,field) {
            let user_id = rows[0].id;
            if (err)
                return  res.json({status:false,message:"getting error",error:err});
                    
            if (rows.length) {
                connection.query("insert into favourite_videos(video_id,user_id) values(?,?)",[id,user_id] ,function(err, rows,field) {
                    if (err)
                        return  res.json({status:false,message:"getting error",error:err});
                    else{
                        return  res.json({status:true,message:"video Favourite successful"});
                    }   
                    
                });
            }
            else{
                return  res.json({status:false,message:"This user Token is not Exist.."});
            }
        });
    })

    router.delete('/favourite',function(req,res){
        CommonComponent.verifyToken(req,res);
        let addclass = {
            id
        } = req.body;
        if (!(typeof id === 'string')) {
            return res.json({"status":false,"message":"Invalid data provided"});
        }
    
        if(id == '' || id === undefined){
            return res.json({status:false,message:"Please Provide video id",data:""});
        }
        let tokens = req.headers['authorization'];
        tokens = tokens.substr(7);
        connection.query("SELECT * FROM users where token=?",[tokens] ,function(err, rows,field) {
            let user_id = rows[0].id;
            if (err)
                return  res.json({status:false,message:"getting error",error:err});
                    
            if (rows.length) {
                connection.query("delete from favourite_videos where video_id=? and user_id=?",[id,user_id] ,function(err, rows,field) {
                    if (err)
                        return  res.json({status:false,message:"getting error",error:err});
                    else{
                        return  res.json({status:true,message:"video Unfavourite successful"});
                    }   
                    
                });
            }
            else{
                return  res.json({status:false,message:"This user Token is not Exist.."});
            }
        });
       
    })
module.exports = router;