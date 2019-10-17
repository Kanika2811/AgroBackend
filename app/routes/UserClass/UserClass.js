var mysql = require('mysql');
var dbconfig = require('../../../config/database');
var connection = mysql.createConnection(dbconfig.connection);
var dateTime = require('node-datetime');
var dt = dateTime.create();
dt.format('Y-m-d H:M:S');
const express = require('express');
const router = express.Router();
connection.query('USE ' + dbconfig.database);
router.get('/UserClass', function(req,res){
        connection.query("select * from classes", function(error,rows, fields){
            if(error)
                 return res.json({"status":false,"message":"Error getting classes"});
            else
                return res.json({"status":true,"message":"Getting all classes","data":rows});
        });
    });

    router.post('/UserClass', function(req,res){
        verifyToken(req,res)

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
        connection.query("select * from classes WHERE class_name = ?" [class_name],function(error,rows,fields){
            if(error.message == 'Query was empty'){
                console.log('There is no changes in the update, lets continue the progress...');
            }
            if(class_name === rows){
                    return res.json({"status":false,"message":"Class already exist"});
            }
            else {
                connection.query('insert into classes(class_name,board,stream) values(?,?,?)',[class_name,board,stream],function(error,rows,fields){
                   console.log(error)
                    if(error)
                        return res.json({"status":false,"message":"Error Adding new class class"});
                    else{
                     return res.json({"status":true,"message":"Add class successfully!!!","data":addclass});
        
                    }
                });
            }
        });
       
    })

    router.put('/UserClass',function(req,res){
        let editclass = {
            class_name:req.body.class_name,
            board:req.body.board,
            stream:req.body.stream,
            id:req.body.id
        }
        let sql ='UPDATE classes SET class_name = ?, board=?, stream=?, updated_timestamp=? WHERE id = ?';
        connection.query(sql, [editclass.class_name,editclass.board, editclass.stream,new Date(dt.now()), editclass.id], function (err, rows, fields) {
            if(!!err) {
                 console.log('error in this query'+err); }
            else{
                 return res.json({"message":"Edit class successfully!!!","data":editclass});
            }
        });
    })

    router.delete('/UserClass',function(req,res){
        connection.query('DELETE FROM classes WHERE id=?',[req.body.id],function(err,rows,fields){
            if(!!err){
                 console.log('error in this query'+err)}
            else{
                return res.json({"message":"Record deleted successfully!!"})
            }

        });
    })
    function verifyToken(req, res, next){
    
        //Request header with authorization key
        const bearerHeader = req.headers['authorization'];
        
        //Check if there is  a header
        if(typeof bearerHeader !== 'undefined'){
            const bearer = bearerHeader.split(' ');
            
            //Get Token arrray by spliting
            const bearerToken = bearer[1];
            req.token = bearerToken;
            //call next middleware
            //next();
        }else{
            res.json({"status":false,"Message":"User Unauthorized"});
        }
    }

    module.exports = router;