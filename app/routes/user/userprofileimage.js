const express = require('express');
var mysql = require('mysql');
const router = express.Router();
const dbconfig = require('../../../config/database');
const connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);
const CommonComponent = require("../../../config/CommonComponent");
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const path = require("path");

const fs = require('fs');

var dateTime = require('node-datetime');
var dt = dateTime.create();
dt.format('Y-m-d H:M:S');

var Constants = require('../../../config/ConstantKeys')

aws.config.update({
    secretAccessKey:Constants.AWS_secretAccessKey,
    accessKeyId:Constants.AWS_accessKeyId,
    region:'ap-south-1'
});

const s3 = new aws.S3();
 
const uploadFile = (fileName) => {
   const fileContent = fs.readFileSync(fileName);
    const params = {
        Bucket: 'mrb-data',
        Key: 'profile_2.png', 
       Body: fileContent
    };
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};

const secondsSinceEpoch =Date.now() 
const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'mrb-data/profile_image',
      acl: 'public-read',
      key: function (req, file, cb) {
        cb(null, secondsSinceEpoch.toString())
      }
    })
  }).single('profileImage');

router.post('/profile', function(req,res){
    CommonComponent.verifyToken(req,res);
    let tokens = req.headers['authorization'];
    tokens = tokens.substr(7);
    connection.query("SELECT * FROM users where token=?",[tokens] ,function(err, rows,field) {
        if (err)
            return  res.json({status:false,message:"getting error",error:err});
        if (rows.length) {
            let user_id=rows[0].contact_no;
            upload(req,res,(error)=>{

                if (req.fileValidationError) {
                    return res.send(req.fileValidationError);
                }
                else if (!req.file) {
                    return  res.json({status:false,message:"Please select an image to upload"});
                }
               if(error){
                return  res.json({status:false,message:"getting error ",error:error});
               }
               else
               {
                   if(req.file === undefined){
                        return  res.json({status:false,message:"Please select an image to upload"});
                   }
                   else{
                        const imageName = req.file.key;
                        const imageLocation = req.file.location;
                        let sql ='UPDATE  users SET profile_image = ?,updated_timestamp=? WHERE contact_no = ?';
                        connection.query(sql,[imageLocation,Date.now(),user_id], function(err, rows,fields) {
                        if(!err){
                            connection.query("SELECT * FROM users WHERE contact_no = ?",[user_id], function(err,rows) {
                                if(rows[0].delete_flag==0){
                                    rows[0].delete_flag=false;
                                }
                                else{
                                    rows[0].delete_flag=true;
                                }
                                if(rows[0].is_verified==0)
                                    rows[0].is_verified=false;
                                else
                                    rows[0].is_verified=true;

                                if(rows[0].is_video_purchased==0)
                                    rows[0].is_video_purchased=false;
                                else
                                    rows[0].is_video_purchased=true;

                                rows[0].dob=rows[0].dob.toLocaleString().slice(0,10).replace('/','-').replace('/','-');
                                return res.json({status:true,message:"Profile Image Uploaded successfully!!!","data":rows[0]});
                            });
                        }
                    else{
                            return  res.json({status:false,message:"getting error ",error:err});
                        }
                    });

                        
                   }
               }
            });


        }
        else{
            return  res.status(401).send({status:401,message : 'User Unauthorized'})
        }
    });


    
    
})
router.put('/profile', function(req,res){
    CommonComponent.verifyToken(req,res);
    let tokens = req.headers['authorization'];
    tokens = tokens.substr(7);
    connection.query("SELECT * FROM users where token=?",[tokens] ,function(err, rows,field) {
        if (err)
            return  res.json({status:false,message:"getting error",error:err});
        if (rows.length) {
            let user_id=rows[0].contact_no;
            upload(req,res,(error)=>{

                if (req.fileValidationError) {
                    return res.send(req.fileValidationError);
                }
                else if (!req.file) {
                    return  res.json({status:false,message:"Please select an image to upload"});
                }
               if(error){
                return  res.json({status:false,message:"getting error ",error:error});
               }
               else
               {
                   if(req.file === undefined){
                        return  res.json({status:false,message:"Please select an image to upload"});
                   }
                   else{
                        const imageName = req.file.key;
                        const imageLocation = req.file.location;
                        let sql ='UPDATE  users SET profile_image = ?,updated_timestamp=? WHERE contact_no = ?';
                        connection.query(sql,[imageLocation,Date.now(),user_id], function(err, rows,fields) {
                        if(!err){
                            connection.query("SELECT * FROM users WHERE contact_no = ?",[user_id], function(err,rows) {
                                if(rows[0].delete_flag==0){
                                    rows[0].delete_flag=false;
                                }
                                else{
                                    rows[0].delete_flag=true;
                                }
                                if(rows[0].is_verified==0)
                                    rows[0].is_verified=false;
                                else
                                    rows[0].is_verified=true;

                                if(rows[0].is_video_purchased==0)
                                    rows[0].is_video_purchased=false;
                                else
                                    rows[0].is_video_purchased=true;

                                rows[0].dob=rows[0].dob.toLocaleString().slice(0,10).replace('/','-').replace('/','-');
                                return res.json({status:true,message:"Profile Image Uploaded successfully!!!","data":rows[0]});
                            });
                        }
                    else{
                            return  res.json({status:false,message:"getting error ",error:err});
                        }
                    });

                        
                   }
               }
            });


        }
        else{
            return  res.status(401).send({status:401,message : 'User Unauthorized'})
        }
    });


    
    
})


const encryptor = require('file-encryptor');


const key = 'Kj4S2pML';
let options = { algorithm: 'des' };

  router.post('/testsncy', function(req,res){
    let file = path.join(__dirname, `1 Quadratic Equations Introduction.mp4`)
    
    encryptor.encryptFile(file, 'Quadratic.mp4', key, options,function(err) {
        // Encryption complete.
      });
     
  });

  router.post('/testsncy1', function(req,res){
    let file = path.join(__dirname, `../../../Quadratic.mp4`)
    
   
      encryptor.decryptFile(file, 'outputfile.mp4', key,options, function(err) {
        // Decryption complete.
     });
  });
module.exports = router;