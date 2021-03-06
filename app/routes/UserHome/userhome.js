const express = require('express');
const router = express.Router();
var mysql = require('mysql');
var dbconfig = require('../../../config/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);
const CommonComponent = require("../../../config/CommonComponent");


router.get('/userHome', function(req,res){
    CommonComponent.verifyToken(req,res);
    let Home_data =[];
    let obj ={};
    let class_id;
    let addclass = {
        user_class
    } = req.query;
    if (!(typeof user_class === 'string')) {
        return res.json({"status":false,"message":"Invalid data provided"});
    }

    if(user_class == '' || user_class === undefined){
        return res.json({status:false,message:"Please Provide User Class",data:""});
    }
    let tokens = req.headers['authorization'];
    tokens = tokens.substr(7);
    connection.query("SELECT * FROM users where token=?",[tokens] ,function(err, rows,field) {
        
        if (err)
        return  res.json({status:false,message:"getting error",error:err});
        
        if (rows.length) {
            let user_id = rows[0].id;
            let user_name = rows[0].name;
            let wallet = rows[0].wallet;
            connection.query("SELECT * FROM classes where class_name=?",[req.query.user_class] ,function(err, rows,field) {
                if (err)
                    return  res.json({status:false,message:"getting error in user class",error:err});
                if (rows.length) {
                    class_id=rows[0].id;
                    
                    connection.query("SELECT * FROM teacher", function(err, rows,field) {
                        if (err)
                            return res.json({status:false,message:"getting error in teacher list",error:err});
                        if (rows.length) {
                            for(let i=0;i<rows.length;i++)
                            {
                                if(rows[i].delete_flag==0){
                                    rows[i].delete_flag=false;
                                }else{
                                    rows[i].delete_flag=true;
                                }
                            }
                            obj["teacher_list"] =rows;
                        }
                        else
                        {
                            obj["teacher_list"] =[];
                        }

                        connection.query("SELECT * FROM videos where isdemovideo=true", function(err, rows,field) {
                            if (err)
                                return res.json({status:false,message:"getting error in demo videos list",error:err});
                            if (rows.length) {
                                let video_id =[];
                                for(let i=0;i<rows.length;i++)
                                {
                                    video_id.push("'"+rows[i].video_id+"'");
                                    if(rows[i].delete_flag==0){
                                        rows[i].delete_flag=false;
                                    }else{
                                        rows[i].delete_flag=true;
                                    }
                                    if(rows[i].isdemovideo==0){
                                        rows[i].isdemovideo=false;
                                    }else{
                                        rows[i].isdemovideo=true;
                                    }
                                }
                                connection.query("select * from like_videos where video_id in("+video_id+") and user_id = ?",[user_id], function(error,rows1, fields){
                                    if(!!error){
                                        return done("error in this query");}
                                    else{
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
                                            obj["demo_video_list"] =rows;
                                        });
                                    }
                                });



                                
                            }
                            else
                            {
                                obj["demo_video_list"] =[];
                            }

                            connection.query("SELECT * FROM subject where class_id=?",[class_id] ,function(err, rows,field) {
                                if (err)
                                    return res.json({status:false,message:"getting error in subject list",error:err});
                                if (rows.length) {
                                    for(let i=0;i<rows.length;i++)
                                    {
                                        if(rows[i].delete_flag==0){
                                            rows[i].delete_flag=false;
                                        }else{
                                            rows[i].delete_flag=true;
                                        }
                                    }
                                    obj["subject_list"] =rows;
                                    
                                }
                                else
                                {
                                    obj["subject_list"] =[];
                                    
                                }

                                connection.query("SELECT * FROM subscription where class_id=?",[class_id], function(err, rows,field) {
                                    if (err)
                                        return res.json({status:false,message:"getting error in subscription list",error:err});
                                    if (rows.length) {
                                        for(let i=0;i<rows.length;i++)
                                        {
                                            if(rows[i].delete_flag==0){
                                                rows[i].delete_flag=false;
                                            }else{
                                                rows[i].delete_flag=true;
                                            }
                                        }
                                        obj["subscription"] =rows;
                                        
                                    }
                                    else
                                    {
                                        obj["subscription"] =[];
                                        
                                    }

                                    connection.query("SELECT * FROM favourite_videos where user_id=?",[user_id], function(err, rows,field) {
                                        if (err)
                                            return res.json({status:false,message:"getting error in favourite videos",error:err});
                                        if (rows.length) {
                                            let video_id_array =[];
                                            for(let i=0;i<rows.length;i++)
                                            {
                                                video_id_array.push("'"+rows[i].video_id+"'");
                                            }
                                            connection.query("SELECT * FROM videos where video_id in("+video_id_array+")", function(err, rows,field) {
                                                if (err)
                                                    return res.json({status:false,message:"getting error in videos list according to favourite videos",error:err});
                                                if (rows.length) {
                                                    for(let i =0;i<rows.length;i++)
                                                    {
                                                        rows[0].user_name=user_name;
                                                        if(rows[i].delete_flag==0){
                                                            rows[i].delete_flag=false;
                                                        }else{
                                                            rows[i].delete_flag=true;
                                                        }
                                                    }
                                                    obj["favourite_videos"] =rows;

                                                    obj["app_expiry"] ="1585699160000";
                                                    obj["wallet"] =wallet;
                                                }
                                                else{
                                                    obj["favourite_videos"] =[];
                                                    obj["app_expiry"] ="1585699160000";
                                                    obj["wallet"] =wallet;
                                                }
                                                return res.json({status:true,message:"Get Home Data successfully!!!",data:obj});

                                            });
                                            
                                        }
                                        else
                                        {
                                            obj["favourite_videos"] =[];
                                            obj["app_expiry"] ="1585699160000";
                                            obj["wallet"] =wallet;
                                            return res.json({status:true,message:"Get Home Data successfully!!!",data:obj});
                                            
                                        }
                                    });

                                    
                                });

                                
                            });
                        });
                    });

                   

                    
                    

                }
                else
                {
                    return  res.json({status:false,message:"This user class is not exist.",error:err});
                }
            });
        }
        else{
            return  res.status(401).send({status:401,message : 'User Unauthorized'})
        }
    });



    

   
     
 })

 module.exports = router;