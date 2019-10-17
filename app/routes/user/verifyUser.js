
const express = require('express');
const router = express.Router();

var mysql = require('mysql');
var dbconfig = require('../../../config/database');
var connection = mysql.createConnection(dbconfig.connection);
const jwt = require('jsonwebtoken');

connection.query('USE ' + dbconfig.database);

router.post('/test', async (req, res) => {
    //const platforms = await Platform.find().sort('name');
    let contact_no = req.body.contact_no;
    let otp = req.body.otp;
    connection.query("SELECT otp FROM my_schema.users WHERE contact_no = ?",[contact_no], function(err, rows) {
       if(!err){
            if(otp == rows[0].otp){
                connection.query("UPDATE  my_schema.users SET is_verified = 1 WHERE contact_no = ?",[contact_no], function(err, rows) {
                    if(!err){
                        connection.query("SELECT * FROM my_schema.users WHERE contact_no = ?",[contact_no], function(err, rows) {
                        return res.json({"message":"User verified successfully","data":rows[0]});
                        });
                    }
                    else{
                        return res.json({"error":err});
                    }
            });

            }
            else{
                return res.json({"message":"Incorrect opt"});
            }
       }
    });

});
router.post('/verify', (req, res) => {
    
    //Check if there is  a header
   
    verifyToken(req,res)
    jwt.verify(req.token, 'SuperSecRetKey', (err, authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            connection.query("SELECT * FROM my_schema.users WHERE contact_no = 918284946265", function(err, rows) {
                return res.json({"message":"User verified successfully","data":rows[0]});
                });
        }
    });
});
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
        res.sendStatus(403);
    }
}
module.exports = router;