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

    router.get('/subjects', function(req,res){
        CommonComponent.verifyToken(req,res);
        let getsubject = {
            class_id
        } = req.body;
        if (!(typeof class_id === 'string' )) {
            return res.json({"status":false,"message":"Invalid data provided"});
        }

        if(class_id == '' || class_id === undefined){
            return res.json({status:false,Message:"Please Select Class first"});
        }
        connection.query('select * from subject where class_id=?',[class_id],function(error,rows, fields){
            if (err)
                return  res.json({status:false,message:"getting error",error:err});
            if(rows.length==0)
            {
                return res.json({"message":"There is no subject in this Class"});
            }
            else
            {
                return res.json({"message":"subject list","data":rows});
            }
               
        });
    })

    router.post('/subjects',function(req,res){
        CommonComponent.verifyToken(req,res)
        let addclass = {
            class_id,
            subject_name,
            medium
        }=req.body;
        if (!(typeof class_id === 'string' ||
        typeof subject_name === 'string' ||
        typeof medium === 'string')) {
            return res.json({"status":false,"message":"Invalid data provided"});
        }

        if(class_id == '' || class_id === undefined){
            return res.json({status:false,Message:"Please Select Class First."});
        }
        if(subject_name == '' || subject_name === undefined){
            return res.json({status:false,Message:"Please Enter Subject Name."});
        }
        if(medium == '' || medium === undefined){
            return res.json({status:false,Message:"Please Enter Subject Medium Name."});
        }

        connection.query('select * from subject WHERE subject_name = ? and medium=? and class_id=?', [subject_name,medium,class_id],function(error,rows,fields){
            if (err)
                return  res.json({status:false,message:"getting error",error:err});
            if(rows.length >= 1&&subject_name === rows[0].subject_name){
                    return res.json({"status":false,"message":"Subject already exist"});
            }
            else {
                connection.query('insert into subject(class_id,subject_name,medium,created_timestamp,updated_timestamp) values(?,?,?,?,?)',[class_id,subject_name,medium,Math.round(new Date().getTime() / 1000),Math.round(new Date().getTime() / 1000)],function(error,rows,fields){
                    if (error){
                        return  res.json({status:false,message:"getting error",error:error});}
                    else{
                        connection.query("select * from subject WHERE subject_name = ? and medium=? and class_id=?",[subject_name,medium,class_id], function(err, rows) {
                        return res.json({"message":"Add Subject successfully!!!","data":rows[0]});
                        });

                    }
                });

        }
    });

    })

    router.put('/subjects',function(req,res){
        CommonComponent.verifyToken(req,res)
       
        let addclass = {
            class_id,
            subject_id,
            subject_name,
            medium
        }=req.body;
        if (!(typeof class_id === 'string' ||
        typeof subject_id === 'string' ||
        typeof subject_name === 'string' ||
        typeof medium === 'string')) {
            return res.json({"status":false,"message":"Invalid data provided"});
        }

        if(class_id == '' || class_id === undefined){
            return res.json({status:false,Message:"Please Provide Class Id."});
        }
        if(subject_id == '' || subject_id === undefined){
            return res.json({status:false,Message:"Please Provide Subject Id."});
        }
        if(subject_name == '' || subject_name === undefined){
            return res.json({status:false,Message:"Please Provide Subject Name."});
        }
        if(medium == '' || medium === undefined){
            return res.json({status:false,Message:"Please Provide Subject Medium Name."});
        }
        connection.query('select * from subject WHERE subject_name = ? and medium=? and class_id=?', [subject_name,medium,class_id],function(error,rows,fields){
            if (error)
                        return  res.json({status:false,message:"getting error",error:error});
            if(rows.length >= 1&&subject_name === rows[0].subject_name){
                    return res.json({"status":false,"message":"Subject already exist"});
            }
            else {

                    let sql ='UPDATE subject SET subject_name = ? , medium=?, updated_timestamp=? WHERE id = ? and class_id=?';
                    connection.query(sql, [subject_name,medium,Math.round(new Date().getTime() / 1000),subject_id,class_id], function (err, rows, fields) {
                        if (err){
                        return  res.json({status:false,message:"getting error",error:err});}
                        else{
                            connection.query('select * from subject WHERE subject_name = ? and medium=? and class_id=?', [subject_name,medium,class_id],function(error,rows,fields){
                         return res.json({"message":"Edit Subject successfully!!!","data":rows[0]});
                            });
                        }
                    });
             }
         });
    })

    router.delete('/subjects',function(req,res){
        CommonComponent.verifyToken(req,res)
        connection.query('DELETE FROM subject WHERE id=?',[req.body.id],function(err,rows,fields){
            if (err){
                return  res.json({status:false,message:"getting error",error:err});}
            else{
                return res.json({"message":"Subject deleted successfully!!"})
            }

        });
    })
module.exports = router;