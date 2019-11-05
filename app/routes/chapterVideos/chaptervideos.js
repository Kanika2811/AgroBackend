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


        connection.query("select * from videos where chapter_id=?",[chapter_id], function(error,rows, fields){
            if(!!error)
             return done("error in this query");
            if(rows.length==0)
            {
                return res.json({status:false,"message":"There is no videos in this chapter id"});
            }
            else
            {
                return res.json({status:true,"message":"video list","data":rows});
            }
        });
    });

    


    module.exports = router;