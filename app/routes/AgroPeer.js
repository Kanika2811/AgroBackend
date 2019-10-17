'use strict';
var mysql = require('mysql');
var dbconfig = require('../../../config/database');
var connection = mysql.createConnection(dbconfig.connection);
var dateTime = require('node-datetime');
var dt = dateTime.create();
dt.format('Y-m-d H:M:S');
export async function insertClass(data) {
    
    try {
        connection.query('insert into classes(class_name,board,stream) values(?,?,?)',[data.class_name,data.board,data.stream],function(error,rows,fields){
            if(error)
                return res.json({"status":false,"message":"Error Adding class"});
            else{
                return res.json({"message":"Add class successfully!!!","data":rows[0]});
            }
        });
        return user;
    } catch (e) {
        throw wrapError(`Error inserting data`, e);
    }
}

