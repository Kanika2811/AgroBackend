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


router.get('/chapterVideos', function(req,res){
    CommonComponent.verifyToken(req,res)
    let addclass = {
        chapter_id
    } = req.query;
    if (!(typeof chapter_id === 'string')) {
        return res.json({"status":false,"message":"Invalid data provided"});
    }

    if(chapter_id == '' || chapter_id === undefined){
        return res.json({status:false,message:"Please Provide chapter id",data:""});
    }
    let tokens = req.headers['authorization'];
    tokens = tokens.substr(7);
    connection.query("SELECT * FROM users where token=?",[tokens] ,function(err, rows,field) {
        if (err)
            return  res.json({status:false,message:"getting error",error:err});
                
        if (rows.length) {
            let user_name = rows[0].name;
            let user_id = rows[0].id;
            connection.query("select * from videos where chapter_id=?",[chapter_id], function(error,rows, fields){
                if(!!error)
                 return done("error in this query");
                if(rows.length==0)
                {
                    return res.json({status:false,"message":"There is no videos in this chapter id"});
                }
                else
                {
                    let video_id =[];
                    for(let i=0;i<rows.length;i++)
                    {
                        video_id.push("'"+rows[i].video_id+"'");
                        if(rows[i].delete_flag==0){
                            rows[i].delete_flag=false;
                        }else{
                            rows[i].delete_flag=true;
                        }
                    }
                    connection.query("select * from like_videos where video_id in("+video_id+") and user_id = ?",[user_id], function(error,rows1, fields){
                        if(!!error)
                            return done("error in this query");
                        if(rows1.length)
                        {
                            for(let j=0;j<rows.length;j++)
                            {
                                    rows[j].isLiked = false;
                            }
                            for(i=0;i<rows1.length;i++)
                            {
                                for(let j=0;j<rows.length;j++)
                                {
                                    if(rows[j].video_id==rows1[i].video_id){
                                        rows[j].isLiked = true;
                                    }
                                }
                            }
                        }
                        else
                        {
                            for(let j=0;j<rows.length;j++)
                                {
                                    rows[j].isLiked = false;
                                }
                        } 
                        connection.query("select * from favourite_videos where video_id in("+video_id+") and user_id = ?",[user_id], function(error,rows2, fields){
                            if(!!error){
                                return done("error in this query");}
                            else{
                                for(let j=0;j<rows.length;j++)
                                {
                                        rows[j].isFavourited = false;
                                }
                                for(i=0;i<rows2.length;i++)
                                {
                                    for(let j=0;j<rows.length;j++)
                                    {
                                        if(rows[j].video_id==rows2[i].video_id){
                                            rows[j].isFavourited = true;
                                        }
                                    }
                                }
                            }
                            return res.json({status:true,"message":"video list","data":rows});
                        });
                        
                    });
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