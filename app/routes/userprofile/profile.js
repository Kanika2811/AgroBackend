var mysql = require('mysql');
var dbconfig = require('../../../config/database');
var connection = mysql.createConnection(dbconfig.connection);
const express = require('express');
const router = express.Router();
connection.query('USE ' + dbconfig.database);
var CommonComponent = require("../../../config/CommonComponent");
var dateTime = require('node-datetime');
var dt = dateTime.create();
dt.format('Y-m-d H:M:S');
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");

router.post('/profile',function(req,res){
    CommonComponent.verifyToken(req,res);
    let addclass = {
        imageUrl
    } = req.body;
    if (!(typeof imageUrl === 'string')) {
        return res.json({"status":false,"message":"Invalid data provided"});
    }

    if(imageUrl == '' || imageUrl === undefined){
        return res.json({status:false,message:"Please Provide profile image url",data:""});
    }

    let tokens = req.headers['authorization'];
    tokens = tokens.substr(7);
    connection.query("SELECT * FROM users where token=?",[tokens] ,function(err, rows,field) {
        if (err)
            return  res.json({status:false,message:"getting error",error:err});
                    
        if (rows.length) {
            
            let user_id=rows[0].contact_no;
            CommonComponent.profileUpload(req,function(response){
                let sql ='UPDATE  users SET profile_image = ?,updated_timestamp=? WHERE contact_no = ?';
                connection.query(sql,[response,new Date(dt.now()),user_id], function(err, rows,fields) {
            if(!err){
                connection.query("SELECT * FROM users WHERE contact_no = ?",[user_id], function(err,rows) {
                    if(rows[0].delete_flag==0){
                        rows[0].delete_flag=false;
                    }
                    else{
                        rows[0].delete_flag=true;
                    }
                    if(rows[0].is_verified==0)
                        rows[0].is_verified=false;
                    else
                        rows[0].is_verified=true;

                    if(rows[0].is_video_purchased==0)
                        rows[0].is_video_purchased=false;
                    else
                        rows[0].is_video_purchased=true;

                    rows[0].dob=rows[0].dob.toLocaleString().slice(0,10).replace('/','-').replace('/','-');
                    return res.json({status:true,message:"Profile Image Uploaded successfully!!!","data":rows[0]});
                });
            }
           else{
                return  res.json({status:false,message:"getting error ",error:err});
            }
        });
            })
            
        }
        else{
            return  res.json({status:false,message:"This user Token is not Exist.."});
        }
    });

});


router.put('/profile',function(req,res){
    CommonComponent.verifyToken(req,res);
    let addclass = {
        imageUrl
    } = req.body;
    if (!(typeof imageUrl === 'string')) {
        return res.json({"status":false,"message":"Invalid data provided"});
    }

    if(imageUrl == '' || imageUrl === undefined){
        return res.json({status:false,message:"Please Provide profile image url",data:""});
    }

    let tokens = req.headers['authorization'];
    tokens = tokens.substr(7);
    connection.query("SELECT * FROM users where token=?",[tokens] ,function(err, rows,field) {
        if (err)
            return  res.json({status:false,message:"getting error",error:err});
                    
        if (rows.length) {
            
            let user_id=rows[0].contact_no;
            CommonComponent.profileUpload(req,function(response){
                let sql ='UPDATE  users SET profile_image = ?,updated_timestamp=? WHERE contact_no = ?';
                connection.query(sql,[response,new Date(dt.now()),user_id], function(err, rows,fields) {
            if(!err){
                connection.query("SELECT * FROM users WHERE contact_no = ?",[user_id], function(err,rows) {
                    if(rows[0].delete_flag==0){
                        rows[0].delete_flag=false;
                    }
                    else{
                        rows[0].delete_flag=true;
                    }
                    if(rows[0].is_verified==0)
                        rows[0].is_verified=false;
                    else
                        rows[0].is_verified=true;

                    if(rows[0].is_video_purchased==0)
                        rows[0].is_video_purchased=false;
                    else
                        rows[0].is_video_purchased=true;

                    rows[0].dob=rows[0].dob.toLocaleString().slice(0,10).replace('/','-').replace('/','-');
                    return res.json({status:true,message:"Profile Image Uploaded successfully!!!","data":rows[0]});
                });
            }
           else{
                return  res.json({status:false,message:"getting error ",error:err});
            }
        });
            })
            
        }
        else{
            return  res.json({status:false,message:"This user Token is not Exist.."});
        }
    });
});
router.post('/profile1',function(req,res){
    const file=  req.body;
console.log(file);

});
module.exports = router;