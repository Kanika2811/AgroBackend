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
        connection.query("select * from subject", function(error,rows, fields){
            if(!!error)
                console.log("error in this query");
            else
                return res.json({"message":"subject list","data":rows});
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
        connection.query('insert into subject(class_id,subject_name,medium) values(?,?,?)',[addclass.class_name,addclass.board,addclass.stream],function(error,rows,fields){
            if(!!error)
                console.log(error);
            else{
                addclass.id = rows.insertId;
                return res.json({"message":"Add class successfully!!!","data":addclass});

            }
        });
    })

    router.put('/subjects',function(req,res){
        CommonComponent.verifyToken(req,res)
        let editclass = {
            class_name:req.body.class_name,
            board:req.body.board,
            stream:req.body.stream,
            id:req.body.id
        }
        let sql ='UPDATE subject SET class_id = ?, board=?, stream=?, updated_timestamp=? WHERE id = ?';
        connection.query(sql, [editclass.class_name,editclass.board, editclass.stream,new Date(dt.now()), editclass.id], function (err, rows, fields) {
            if(!!err) { console.log('error in this query'+err); }
            else{
            return res.json({"message":"Edit class successfully!!!","data":editclass});
            }
        });
    })

    router.delete('/subjects',function(req,res){
        CommonComponent.verifyToken(req,res)
        connection.query('DELETE FROM subject WHERE id=?',[req.body.id],function(err,rows,fields){
            if(!!err){ console.log('error in this query'+err)}
            else{
                return res.json({"message":"Record deleted successfully!!"})
            }

        });
    })
module.exports = router;