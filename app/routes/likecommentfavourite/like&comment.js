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

    router.get('/likeAndomment', function(req,res){
        CommonComponent.verifyToken(req,res);
        let addclass = {
            video_id,
            operation
        } = req.query;
        if (!(typeof video_id === 'string'||
        typeof operation === 'string')) {
            return res.json({"status":false,"message":"Invalid data provided"});
        }
    
        if(video_id == '' || video_id === undefined){
            return res.json({status:false,message:"Please Provide video id",data:""});
        }
        if(operation == '' || operation === undefined){
            return res.json({status:false,message:"Please Provide which operation you want use it like or comment",data:""});
        }
        let tokens = req.headers['authorization'];
        tokens = tokens.substr(7);
        connection.query("SELECT * FROM users where token=?",[tokens] ,function(err, rows,field) {
            if (err)
                return  res.json({status:false,message:"getting error",error:err});
                    
            if (rows.length) {
                if(operation == "comment")
                {
                    connection.query("select * from comments where video_id=?",[video_id] ,function(err, rows,field) {
                        if (err)
                            return  res.json({status:false,message:"getting error",error:err});
                        if (rows.length) {
                            let video_comment_data = rows;
                            let comment_user =[];
                            for(let i=0;i<rows.length;i++)
                            {
                                comment_user.push(rows[i].user_id);
                            }
                            connection.query("select * from users where id in("+comment_user+")",function(err, rows,field) {
                                if (err)
                                    return  res.json({status:false,message:"getting error",error:err});
                                if (rows.length) {
                                    for(let i=0;i<rows.length;i++)
                                    {
                                        video_comment_data[i].user_name = rows[i].name;
                                        video_comment_data[i].user_profile_image = rows[i].profile_image;
                                        
                                    }
                                    return  res.json({status:true,message:"Get comments Successfully",data:video_comment_data});

                                }
                            })
                            
                        }  
                        else
                        {
                            return  res.json({status:false,message:"No comment in this video",data:[]});
                        } 
                        
                    });
                }
                
            }
            else{
                return  res.json({status:false,message:"This user Token is not Exist.."});
            }
        });
    })

    router.post('/likeAndComment',function(req,res){
        CommonComponent.verifyToken(req,res);
        let addclass = {
            video_id,
            operation
        } = req.body;
        if (!(typeof video_id === 'string'||
        typeof operation === 'string')) {
            return res.json({"status":false,"message":"Invalid data provided"});
        }
    
        if(video_id == '' || video_id === undefined){
            return res.json({status:false,message:"Please Provide video id",data:""});
        }
        if(operation == '' || operation === undefined){
            return res.json({status:false,message:"Please Provide which operation you want use it like or comment",data:""});
        }
        
        let tokens = req.headers['authorization'];
        tokens = tokens.substr(7);
        connection.query("SELECT * FROM users where token=?",[tokens] ,function(err, rows,field) {
            if (err)
                return  res.json({status:false,message:"getting error",error:err});
                    
            if (rows.length) {
                let user_id = rows[0].id;
                if(operation == "comment")
                {
                    if(req.body.comment == '' || req.body.comment === undefined){
                        return res.json({status:false,message:"Please Provide user comment",data:""});
                    }
                    connection.query("insert into comments(video_id,user_id,comment) values(?,?,?)",[video_id,user_id,req.body.comment] ,function(err, rows,field) {
                        if (err)
                            return  res.json({status:false,message:"getting error",error:err});
                        else{
                            return  res.json({status:true,message:"Add user comment successful"});
                        }   
                        
                    });
                }
                if(operation == "like")
                {
                    connection.query("select video_like from videos where video_id=?",[video_id] ,function(err, rows,field) {
                        if (err)
                            return  res.json({status:false,message:"getting error",error:err});
                        if (rows.length) {
                            ++rows[0].video_like;
                            connection.query("update videos set video_like=? where video_id=?",[rows[0].video_like,video_id] ,function(err, rows,field) {
                                if (err)
                                    return  res.json({status:false,message:"getting error",error:err});
                                else{
                                    return  res.json({status:true,message:"Add video like successful"});
                                }   
                            
                            });
                        }
                        else{
                            return  res.json({status:false,message:"This video is not exist"});
                        }
                    });
                }
                
            }
            else{
                return  res.json({status:false,message:"This user Token is not Exist.."});
            }
        });
    })

    

   
module.exports = router;