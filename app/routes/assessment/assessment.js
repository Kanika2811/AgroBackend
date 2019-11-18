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
    } = req.query;
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
            connection.query("SELECT assessment_id,video_id,question,option_1,option_2,option_3,option_4,option_5,correct_answer,total_option,created_timestamp,updated_timestamp,delete_flag FROM assessment where video_id=?",[video_id],function(err, rows,field) {
                if (err)
                    return  res.json({status:false,message:"getting error",error:err});
                if(rows.length)
                {
                    
                    let obj ={};
                    let Home_data =[];
                    let i;
                    for(i=0;i<rows.length;i++)
                    {
                        let home_dat1=[];
                        let obj1={};
                        for(let j=1;j<=rows[i].total_option;j++)
                        {
                            let demotext = "option_"+j;
                            home_dat1.push({demotext:rows[i][demotext]});
                        }
                        
                        if(rows[i].delete_flag==1)
                        rows[i].delete_flag =true;
                        else
                        rows[i].delete_flag =false;

                        
                        Home_data.push({"assessment_id":rows[i].assessment_id,"video_id":rows[i].video_id,"question":rows[i].question,
                        "total_option":rows[i].total_option,"options":home_dat1,
                        "correct_answer":rows[i].correct_answer,"created_timestamp":rows[i].created_timestamp,"updated_timestamp":rows[i].updated_timestamp,
                        "delete_flag":rows[i].delete_flag
                    })
                        
                    }
                    if(i==rows.length)
                    {
                            return  res.json({status:true,message:"Get successfully assessment...",data:Home_data});
                        }
                    
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
router.post('/assessment',function(req,res){
    CommonComponent.verifyToken(req,res);
    let assess = {
        video_id,
        result
    } = req.body;
    if (!(typeof video_id === 'string'||
    typeof result === 'string')) {
        return res.json({"status":false,"message":"Invalid data provided"});
    }

    if(video_id == '' || video_id === undefined){
        return res.json({status:false,message:"Please Provide Video id",data:""});
    }

    if(result == '' || result === undefined){
        return res.json({status:false,message:"Please Provide Result",data:""});
    }
    let tokens = req.headers['authorization'];
    tokens = tokens.substr(7);
    connection.query("SELECT * FROM users where token=?",[tokens] ,function(err, rows,field) {
        if (err)
            return  res.json({status:false,message:"getting error",error:err});
        if (rows.length) {
            let user_id = rows[0].id;
            connection.query("insert into user_result(video_id,result,user_id) values(?,?,?)",[video_id,result,user_id] ,function(err, rows,field) {
                if (err)
                    return  res.json({status:false,message:"getting error",error:err});
                else{
                    return  res.json({status:true,message:"User Result store successfully....."});
                }   
                
            });
        }
        else{

        }
    });
});
module.exports = router;
