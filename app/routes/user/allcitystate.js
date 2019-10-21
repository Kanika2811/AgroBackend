var mysql = require('mysql');
var dbconfig = require('../../../config/database');
var connection = mysql.createConnection(dbconfig.connection);
const express = require('express');
const router = express();
connection.query('USE ' + dbconfig.database);
const yourhandle= require('countrycitystatejson');

router.get('/allClassState', function(req,res){
    
    let state_data =[];
    let obj ={};
        connection.query("select * from classes", function(error,rows, fields){
            if(error)
                 return res.json({"status":false,"message":"Error getting classes"});
            else{
                let states= yourhandle.getStatesByShort('IN'); 
                obj["states"] = states;
                
                let classes = [];
                for (let idx in  rows) {
                    classes.push(rows[idx].class_name);
                }
                obj["classes"] = classes;
                state_data.push(obj)
               return res.json({"status":true,"message":"Success","data":state_data});
            }
        });
    });

    router.get('/cities',function(req,res){
        let user_state_data = {
            user_state,
            } = req.body;
        if (!(typeof user_state === 'string' )) {
            return res.json({"status":false,"message":"Invalid data provided"});
        }
        if(user_state == '' || user_state === undefined){
            return res.json({status:false,Message:"Please Select Your State"});
        }
        console.log(user_state);
        let cities = yourhandle.getCities('IN',user_state);
        return res.json({"status":true,"message":"Success","data":cities});
    });

    module.exports = router;