const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

var Constants = require('../../../config/ConstantKeys')

aws.config.update({
    secretAccessKey:Constants.AWS_secretAccessKey,
    accessKeyId:Constants.AWS_accessKeyId,
    region:'ap-south-1'
});

const s3 = new aws.S3({ })
 
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'mrb-data',
    metadata: function (req, file, cb) {    
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})
 
module.exports = upload;

