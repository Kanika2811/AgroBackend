var mysql = require('mysql');
var dbconfig = require('../../../config/database');
var connection = mysql.createConnection(dbconfig.connection);
const express = require('express');
const router = express();
connection.query('USE ' + dbconfig.database);
const yourhandle= require('countrycitystatejson');

router.get('/allcitystate', function(req,res){
    

        connection.query("select * from classes", function(error,rows, fields){
            if(error)
                 return res.json({"status":false,"message":"Error getting classes"});
            else{
              let states= yourhandle.getStatesByShort('IN'); 
              let allstate = [];
              let obj={}
              for (let idx in  states) {
                  let demo =states[idx];
                  obj[demo] = yourhandle.getCities('IN',states[idx]);
                  allstate.push(obj)
            }
            let classes =[];
            for (let idx in  rows) {
                classes.push(rows[idx].class_name)
          }
               return res.json({"status":true,"message":"Success","data":allstate,"classes":classes});
            }
        });
    });

    module.exports = router;