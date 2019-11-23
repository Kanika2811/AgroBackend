const express = require('express');
const router = express.Router();
var mysql = require('mysql');
var dbconfig = require('../../../config/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);
var CommonComponent = require("../../../config/CommonComponent");
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const path = require("path");


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

router.post('/userProfileImage', function(req,res){
    CommonComponent.verifyToken(req,res);
    let assess = {
        profile_image_url
    } = req.body;
    if (!(typeof profile_image_url === 'string')) {
        return res.json({"status":false,"message":"Invalid data provided"});
    }

    if(profile_image_url == '' || profile_image_url === undefined){
        return res.json({status:false,message:"Please Provide user profile image",data:""});
    }
   uploadFile(profile_image_url);
    
})
const encryptor = require('file-encryptor');


const key = 'Kj4S2pML';
let options = { algorithm: 'des' };

  router.post('/testsncy', function(req,res){
    let file = path.join(__dirname, `1 Quadratic Equations Introduction.mp4`)
    console.log(file);
    encryptor.encryptFile(file, 'Quadratic.mp4', key, options,function(err) {
        // Encryption complete.
      });
     
  });

  router.post('/testsncy1', function(req,res){
    let file = path.join(__dirname, `../../../Quadratic.mp4`)
    console.log(file);
   
      encryptor.decryptFile(file, 'outputfile.mp4', key,options, function(err) {
        // Decryption complete.
     });
  });
module.exports = router;