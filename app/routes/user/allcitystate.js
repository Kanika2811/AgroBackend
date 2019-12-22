var mysql = require('mysql');
var dbconfig = require('../../../config/database');
var connection = mysql.createConnection(dbconfig.connection);
const express = require('express');
const router = express();
connection.query('USE ' + dbconfig.database);
const yourhandle= require('countrycitystatejson');
/**
* @swagger
* /api/v1/allClassState:
*   get:
*     tags:
*       - State/city
*     name: Get All States
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: Getting All States
*       
*/
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
               return res.json({"status":true,"message":"Getting All States","data":state_data});
            }
        });
    });

    
/**
* @swagger
* /api/v1/city:
*   get:
*     tags:
*       -  State/city
*     name: Get all States
*     consumes:
*       - application/json
*     parameters:
*       - in: query
*         name: user_state
*         schema:
*           type: string
*         description: Enter User Selected State
*     responses:
*       200:
*         description: Getting all Cities
*       
*/
    router.get('/city',function(req,res){
        let user_state_data = {
            user_state,
            } = req.query;
        if (!(typeof user_state === 'string' )) {
            return res.json({"status":false,"message":"Invalid data provided"});
        }
        if(user_state == '' || user_state === undefined){
            return res.json({status:false,Message:"Please Select Your State"});
        }
        let cities_data =[];
        let obj ={};
        let cities = yourhandle.getCities('IN',user_state);
        obj["cities"] = cities;
        cities_data.push(obj)
        return res.json({"status":true,"message":"Sucessfully Get All Cities","data":cities_data});
    });

    module.exports = router;