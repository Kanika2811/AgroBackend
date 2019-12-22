

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
/**
* @swagger
* /api/v1/UserClass:
*   get:
*     tags:
*       - Class
*     name: Get All Classes
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: Getting all classes
*       
*/
router.get('/UserClass', function(req,res){
    //CommonComponent.verifyToken(req,res)

        connection.query("select * from classes", function(error,rows){
            if(error)
                 return res.json({"status":false,"message":"Error getting classes"});
            else
                return res.json({"status":true,"message":"Getting all classes","data":rows});
        });
    });

   
/**
 * @swagger
 * /api/v1/UserClass:
 *   post:
 *     tags:
 *       - Class
 *     name: Insert New class
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             class_name:
 *               type: string
 *             board:
 *               type: string
 *             stream:
 *               type: string
 *         required:
 *           - class_name
 *           - board
 *           - stream
 *     responses:
 *       '200':
 *         description: Add class successfully!!!
 */
    router.post('/UserClass', function(req,res){
        //CommonComponent.verifyToken(req,res)
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
            return res.json({status:false,message:"Please Enter Class Name."});
        }
        if(board == '' || board === undefined){
            return res.json({status:false,message:"Please Enter Class Board."});
        }
        if(stream == '' || stream === undefined){
            return res.json({status:false,message:"Please Enter Class Stream"});
        }
        
        connection.query('select * from classes WHERE class_name = ? and stream=?', [class_name,stream],function(error,rows,fields){
            if(error){
                return  res.json({status:false,message:"getting error",error:error});
            }
            if(rows.length >= 1&& class_name === rows[0].class_name){
                    return res.json({"status":false,"message":"Class already exist"});
            }
            else {
                connection.query('insert into classes(class_name,board,stream,created_timestamp,updated_timestamp) values(?,?,?,?,?)',[class_name,board.toUpperCase(),stream,Date.now(),Date.now()],function(error,rows,fields){
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

    /**
 * @swagger
 * /api/v1/UserClass:
 *   put:
 *     tags:
 *       - Class
 *     description: Update existing class
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             class_name:
 *               type: string
 *             board:
 *               type: string
 *             stream:
 *               type: string
 *             class_id:
 *               type: integer
 *         required:
 *           - class_name
 *           - board
 *           - stream
 *           - class_id
 *         
 *     responses:
 *       200:
 *         description: Successfully Updated
 */
    router.put('/UserClass',function(req,res){
       // CommonComponent.verifyToken(req,res)

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
            return res.json({status:false,message:"Please Provide Class Name."});
        }
        if(board == '' || board === undefined){
            return res.json({status:false,message:"Please Provide Class Board."});
        }
        if(stream == '' || stream === undefined){
            return res.json({status:false,message:"Please Provide Class Stream"});
        }
        if(class_id == '' || class_id === undefined){
            return res.json({status:false,message:"Please Provide Class Id"});
        }


        connection.query('select * from classes WHERE class_name = ? and stream=?', [class_name,stream],function(error,rows,fields){
            if(error){
                return  res.json({status:false,message:"getting error",error:error});
            }
            if(rows.length >= 1&&class_name === rows[0].class_name){
                    return res.json({"status":false,"message":"Class already exist"});
            }
            else {

                let sql ='UPDATE classes SET class_name = ?, board=?, stream=?, updated_timestamp=? WHERE id = ?';
                connection.query(sql, [class_name,board, stream,new Date(dt.now()), class_id], function (err, rows, fields) {
                    if(!!err) {
                        return  res.json({status:false,message:"getting error",error:error});}
                    else{
                        connection.query("SELECT * FROM classes WHERE id=?",[class_id], function(err, rows) {
                        return res.json({"status":"true","message":"Edit class successfully!!!","data":rows[0]});
                        });
                    }
                });
            }
    });


    })
/**
 * @swagger
 * /api/v1/UserClass:
 *   delete:
 *     tags:
 *       - Class
 *     description: Deletes existing class
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             class_name:
 *                type: String
 *         required:
 *           - class_name
 *     responses:
 *       200:
 *         description: Class deleted successfully!!
 */
    router.delete('/UserClass',function(req,res){
       // CommonComponent.verifyToken(req,res)
       
    if (!typeof class_name === 'string' ) {
        return res.json({"status":false,"message":"Invalid data provided"});
    }
        connection.query('DELETE FROM classes WHERE class_name=?',[req.body.class_name],function(err,rows,fields){
            if(!!err){
                return  res.json({status:false,message:"getting error",error:err});}
            else{
                return res.json({"status":"true","message":"Class deleted successfully!!"})
            }

        });
    })
   

    module.exports = router;