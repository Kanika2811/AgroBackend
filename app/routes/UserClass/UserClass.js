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
router.get('/UserClass', function(req,res){
    CommonComponent.verifyToken(req,res)

        connection.query("select * from classes", function(error,rows, fields){
            if(error)
                 return res.json({"status":false,"message":"Error getting classes"});
            else
                return res.json({"status":true,"message":"Getting all classes","data":rows});
        });
    });

    router.post('/UserClass', function(req,res){
        CommonComponent.verifyToken(req,res)
        
        let addclass = {
            class_name,
            board,
            stream
        } = req.body;
        if (!(typeof class_name === 'string' ||
        typeof board === 'string' ||
        typeof stream === 'string')) {
            return res.json({"status":false,"message":"Invalid data provided"});
        }

        if(class_name == '' || class_name === undefined){
            return res.json({status:false,Message:"Please Enter Class Name."});
        }
        if(board == '' || board === undefined){
            return res.json({status:false,Message:"Please Enter Class Board."});
        }
        if(stream == '' || stream === undefined){
            return res.json({status:false,Message:"Please Enter Class Stream"});
        }
        
        connection.query('select * from classes WHERE class_name = ? and stream=?', [class_name,stream],function(error,rows,fields){
            if(error){
                console.log(error);
            }
            if(rows.length >= 1&&class_name === rows[0].class_name){
                    return res.json({"status":false,"message":"Class already exist"});
            }
            else {
                connection.query('insert into classes(class_name,board,stream) values(?,?,?)',[class_name,board,stream],function(error,rows,fields){
                    if(error)
                        return res.json({"status":false,"message":"Error Adding new class class"});
                    else{
                        connection.query("SELECT * FROM classes WHERE class_name = ? and stream=?",[class_name,stream], function(err, rows) {
                     return res.json({"status":true,"message":"Add class successfully!!!","data":rows[0]});
                        });
                    }
                });
            }
        });
    })

    router.put('/UserClass',function(req,res){
        CommonComponent.verifyToken(req,res)

        let editclass = {
            class_name:class_name,
            board:board,
            stream:stream,
            class_id:class_id
        } = req.body;
        if (!(typeof class_name === 'string' ||
        typeof board === 'string' ||
        typeof stream === 'string'||
        typeof class_id === 'string')) {
            return res.json({"status":false,"message":"Invalid data provided"});
        }

        if(class_name == '' || class_name === undefined){
            return res.json({status:false,Message:"Please Provide Class Name."});
        }
        if(board == '' || board === undefined){
            return res.json({status:false,Message:"Please Provide Class Board."});
        }
        if(stream == '' || stream === undefined){
            return res.json({status:false,Message:"Please Provide Class Stream"});
        }
        if(class_id == '' || class_id === undefined){
            return res.json({status:false,Message:"Please Provide Class Id"});
        }


        connection.query('select * from classes WHERE class_name = ? and stream=?', [class_name,stream],function(error,rows,fields){
            if(error){
                console.log(error);
            }
            if(rows.length >= 1&&class_name === rows[0].class_name){
                    return res.json({"status":false,"message":"Class already exist"});
            }
            else {

                let sql ='UPDATE classes SET class_name = ?, board=?, stream=?, updated_timestamp=? WHERE id = ?';
                connection.query(sql, [class_name,board, stream,new Date(dt.now()), class_id], function (err, rows, fields) {
                    if(!!err) {
                        console.log('error in this query'+err); }
                    else{
                        connection.query("SELECT * FROM classes WHERE id=?",[class_id], function(err, rows) {
                        return res.json({"message":"Edit class successfully!!!","data":rows[0]});
                        });
                    }
                });
            }
    });


    })

    router.delete('/UserClass',function(req,res){
        CommonComponent.verifyToken(req,res)

        connection.query('DELETE FROM classes WHERE id=?',[req.body.id],function(err,rows,fields){
            if(!!err){
                 console.log('error in this query'+err)}
            else{
                return res.json({"message":"class deleted successfully!!"})
            }

        });
    })
   

    module.exports = router;