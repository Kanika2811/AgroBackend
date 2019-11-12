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
const nanoid = require('nanoid/generate');




    router.post('/favourite',function(req,res){
        CommonComponent.verifyToken(req,res);
        let addclass = {
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
                let user_id = rows[0].id;
                connection.query("SELECT * FROM favourite_videos",function(err, rows,field) {
                    if (err)
                        return  res.json({status:false,message:"getting error",error:err});
                    if(rows.length){
                       
                        let create_fav_id=nanoid('1234567890abcdefghijklmnopqrstuvwxyz', 6);
                        
                        connection.query("insert into favourite_videos(favourite_video_id,video_id,user_id) values(?,?,?)",[create_fav_id,video_id,user_id] ,function(err, rows,field) {
                            if (err)
                                return  res.json({status:false,message:"getting error",error:err});
                            else{
                                return  res.json({status:true,message:"video Favourite successful"});
                            }   
                            
                        });

                    }
                    else
                    {
                        let create_fav_id=nanoid('1234567890abcdefghijklmnopqrstuvwxyz', 6);
                        
                        connection.query("insert into favourite_videos(favourite_video_id,video_id,user_id) values(?,?,?)",[create_fav_id,video_id,user_id] ,function(err, rows,field) {
                            if (err)
                                return  res.json({status:false,message:"getting error",error:err});
                            else{
                                return  res.json({status:true,message:"video Favourite successful"});
                            }   
                            
                        });
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
                let user_id = rows[0].id;
                connection.query("delete from favourite_videos where video_id=? and user_id=?",[video_id,user_id] ,function(err, rows,field) {
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

    router.delete('/clearAllFavourite',function(req,res){
        CommonComponent.verifyToken(req,res);
        let tokens = req.headers['authorization'];
        tokens = tokens.substr(7);
        connection.query("SELECT * FROM users where token=?",[tokens] ,function(err, rows,field) {
            if (err)
                return  res.json({status:false,message:"getting error",error:err});
            if (rows.length) {
                let user_id = rows[0].id;
                connection.query("delete from favourite_videos where user_id=?",[user_id] ,function(err, rows,field) {
                    if (err)
                        return  res.json({status:false,message:"getting error",error:err});
                    else{
                        return  res.json({status:true,message:"All favourite video is clear successful"});
                    }   
                    
                });
            }
            else{
                return  res.json({status:false,message:"This user Token is not Exist.."});
            }
        });
    });

module.exports = router;