const express = require('express');
const router = express.Router();
const upload = require('../uploadFile/uploadfile');
 
const singleUpload = upload.single('image');

router.post('/userProfileImage', function(req,res){

    singleUpload(req,res,function(err){
        return res.json({'imageUrl': req.file.location})
    });
});
   

module.exports = router;