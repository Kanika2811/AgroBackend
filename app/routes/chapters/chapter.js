var mysql = require('mysql');
var dbconfig = require('../../../config/database');
var connection = mysql.createConnection(dbconfig.connection);
var dateTime = require('node-datetime');
var dt = dateTime.create();
dt.format('Y-m-d H:M:S');

connection.query('USE ' + dbconfig.database);
module.exports = function(app) {
    app.get('/selectchapter', function(req,res){
        connection.query("select * from classes", function(error,rows, fields){
            if(!!error)
                console.log("error in this query");
            else
                return res.json({"message":"classes","data":rows});
        });
    })

    app.post('/insertchapter',function(req,res){
        let addclass = {
            class_name:req.body.class_name,
            board:req.body.board,
            stream:req.body.stream
        }
        connection.query('insert into classes(class_name,board,stream) values(?,?,?)',[addclass.class_name,addclass.board,addclass.stream],function(error,rows,fields){
            if(!!error)
                console.log(error);
            else{
                addclass.id = rows.insertId;
                return res.json({"message":"Add class successfully!!!","data":addclass});

            }
        });
    })

    app.put('/editchapter',function(req,res){
        let editclass = {
            class_name:req.body.class_name,
            board:req.body.board,
            stream:req.body.stream,
            id:req.body.id
        }
        let sql ='UPDATE classes SET class_name = ?, board=?, stream=?, updated_timestamp=? WHERE id = ?';
        connection.query(sql, [editclass.class_name,editclass.board, editclass.stream,new Date(dt.now()), editclass.id], function (err, rows, fields) {
            if(!!err) { console.log('error in this query'+err); }
            else{
            return res.json({"message":"Edit class successfully!!!","data":editclass});
            }
        });
    })

    app.delete('/deletechapter',function(req,res){
        connection.query('DELETE FROM classes WHERE id=?',[req.body.id],function(err,rows,fields){
            if(!!err){ console.log('error in this query'+err)}
            else{
                return res.json({"message":"Record deleted successfully!!"})
            }

        });
    })
}