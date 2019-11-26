const path = require("path");
const fs = require('fs');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
var Constants = require('../config/ConstantKeys');
var dateTime = require('node-datetime');
var dt = dateTime.create();
dt.format('Y-m-d H:M:S');

aws.config.update({
    secretAccessKey:Constants.AWS_secretAccessKey,
    accessKeyId:Constants.AWS_accessKeyId,
    region:'ap-south-1'
});

const s3 = new aws.S3();

module.exports = {
    verifyToken : function(req, res, next){
    
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
            res.json({"status":false,"Message":"User Unauthorized"});
        }
    },

    profileUpload : function(req,res)
    {
        let file = path.extname( req.body.imageUrl);
        const fileContent = fs.readFileSync( req.body.imageUrl);
        const secondsSinceEpoch = Math.round(new Date(dt.now())/ 1000)  
            const params = {
                Bucket: 'mrb-data/profile_image',
                Key:secondsSinceEpoch.toString(), 
                Body: fileContent
            };
            s3.upload(params, function(err, data) {
                if (err) {
                    return  res.json({status:false,message:"getting error on upload file",error:err});
                }
                let filelocation = data.Location;
                return res(filelocation);
            });
    }
}

