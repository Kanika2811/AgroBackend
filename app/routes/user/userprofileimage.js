const express = require('express');
const router = express.Router();
const upload = require('../uploadFile/uploadfile');
var mysql = require('mysql');
var dbconfig = require('../../../config/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);
var CommonComponent = require("../../../config/CommonComponent");

 
const singleUpload = upload.single('image');

router.post('/userProfileImage', function(req,res){

   singleUpload(req,res,function(err){
      return res.json({'imageUrl': req.file.location})
    });
    
})

//router.post('/teacher',function(req,res){
    //CommonComponent.verifyToken(req,res)
    //console.log(req.headers["content-type"]);
    //console.log(req.headers["authorization"]);
    //console.log(req.body.teacherImage);

//})

/*router.get('/teacher',function(req,res){
    CommonComponent.verifyToken(req,res)
    connection.query("SELECT * FROM teachers", function(err, rows) {
        if (err)
            return done(err);
        if (rows.length) {
            return res.json({status:true,message:"Get Teachers List successfully!!!",data:rows});
        }
        else {
            return res.json({status:false,message:"Data is empty"});
        }
    });
    
})*/

module.exports = router;