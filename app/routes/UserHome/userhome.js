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
    let class_id;
    let addclass = {
        user_class,
        contact_no
    } = req.query;
    if (!(typeof user_class === 'string'||
    typeof contact_no==='string')) {
        return res.json({"status":false,"message":"Invalid data provided"});
    }

    if(user_class == '' || user_class === undefined){
        return res.json({status:false,message:"Please Provide User Class",data:""});
    }
    if(contact_no == '' || contact_no === undefined){
        return res.json({status:false,message:"Please Provide contact no",data:""});
    }

    connection.query("SELECT * FROM classes where class_name=?",[req.query.user_class] ,function(err, rows,field) {
        if (err)
        return done(err);
        if (rows.length) {
            class_id=rows[0].id;
            connection.query("SELECT * FROM subject where class_id=?",[rows[0].id] ,function(err, rows,field) {
                if (err)
                return done(err);
                if (rows.length) {
                    let obj ={};
                    obj["user_subject_list"] =rows;
                    
                    connection.query("SELECT * FROM teacher", function(err, rows,field) {
                        if (err)
                            return done(err);
                        if (rows.length) {
                               obj["teacher_list"] =rows;
                                    connection.query("SELECT * FROM demo_videos where class_id=?",[class_id], function(err, rows,field) {
                                        if (err)
                                            return done(err);
                                        if (rows.length) {
                                            obj["demo_video_list"] =rows;
                
                                            connection.query("SELECT * FROM subscription where class_id=?",[class_id], function(err, rows,field) {
                                                if (err)
                                                    return done(err);
                                                if (rows.length) {
                                                        obj["subscription"] =rows;
                                                        //Home_data.push(obj);
                                                         connection.query("SELECT * FROM users where contact_no=?",[contact_no], function(err, rows,field) {
                                                            if (err)
                                                             return done(err);
                                                            if (rows.length) {
                                                                connection.query("SELECT * FROM favourite_videos where user_id=?",[rows[0].id], function(err, rows,field) {
                                                                    if (err)
                                                                     return done(err);
                                                                    if (rows.length) {
                                                                        let video_id_array =[];
                                                                        for(let i=0;i<rows.length;i++)
                                                                        {
                                                                            video_id_array.push(rows[i].video_id);
                                                                        }
                                                                        console.log(video_id_array);
                                                                        connection.query("SELECT * FROM videos where id in("+video_id_array+")", function(err, rows,field) {
                                                                            if (err)
                                                                                return done(err);
                                                                            if (rows.length) {
                                                                                obj["favourite_videos"] =rows;
                                                                                Home_data.push(obj);
                                                                                return res.json({status:true,message:"Get Home Data successfully!!!",data:obj});
                                                                            }
                                                                            else{
                                                                                return res.json({status:false,message:"Data is empty"});
                                                                            }
                                                                            

                                                                        });
                                                                        //return res.json({status:true,message:"Get Home Data successfully!!!",data:obj});
                                                                    }
                                                                    else{
                                                                        return res.json({status:false,message:"Data is empty"});
                                                                    }
                                                                });
                                                            }
                                                            else
                                                            {
                                                                return res.json({status:false,message:"Data is empty"});
                                                            }
                                                        });


                                                        
                                                }
                                                else{
                                                    return res.json({status:false,message:"Data is empty"});
                                                }
                                            });
                                        }
                                        else {
                                            return res.json({status:false,message:"Data is empty"});
                                        }
                                    });
                        }
                        else {
                            return res.json({status:false,message:"Data is empty"});
                        }
                    });
                    
                }
                else{
                    return res.json({status:false,message:"subject is not exist."});
                }
                
            });
        }
        else {
            return res.json({status:false,message:"Class is not exist."});
        }

    });

   
     
 })

 module.exports = router;