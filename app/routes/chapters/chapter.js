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


router.get('/chapters', function(req,res){
    CommonComponent.verifyToken(req,res)
    let addclass = {
        subject_id
    } = req.query;
    if (!(typeof subject_id === 'string')) {
        return res.json({"status":false,"message":"Invalid data provided"});
    }

    if(subject_id == '' || subject_id === undefined){
        return res.json({status:false,message:"Please Provide subject id",data:""});
    }


        connection.query("select * from chapters where subject_id=?",[subject_id], function(error,rows, fields){
            if(!!error)
             return done("error in this query");
            if(rows.length==0)
            {
                return res.json({status:false,"message":"There is no chapters in this Subject id"});
            }
            else
            {
                for(let i=0;i<rows.length;i++)
                {
                    if(rows[i].delete_flag==0){
                        rows[i].delete_flag=false;
                    }else{
                        rows[i].delete_flag=true;
                    }
                }
                return res.json({status:true,"message":"chpater list","data":rows});
            }
        });
    });

    


    module.exports = router;