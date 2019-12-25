var mysql = require('mysql');
var dbconfig = require('../../../config/database');
var connection = mysql.createConnection(dbconfig.connection);
var dateTime = require('node-datetime');
var dt = dateTime.create();
dt.format('Y-m-d H:M:S');
const express = require('express');
const router = express.Router();
connection.query('USE ' + dbconfig.database);
var verifyToken = require('../../../config/Verify');
const nanoid = require('nanoid/generate');
let chapterId = nanoid('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 10);
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
var Constants = require('../../../config/ConstantKeys')

aws.config.update({
    secretAccessKey: Constants.AWS_secretAccessKey,
    accessKeyId: Constants.AWS_accessKeyId,
    region: 'ap-south-1'
});

const s3 = new aws.S3();
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'mrb-data/ChapterImage',
        acl: 'public-read',
        key: function (req, file, cb) {
            console.log(file.originalname)
            cb(null, file.originalname)
        }
    })
}).single('chapter_image');

/**
 * @swagger
 * /api/v1/chapters:
 *   get:
 *     tags:
 *       - Chapter
 *     name: Get All Chapter
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         in: header
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *       - name: subject_id
 *         in: query
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Getting all subject
 *       401:
 *         description: Failed to authenticate token.
 *       403:
 *         description: No token provided.
 *       
 */
router.get('/chapters', verifyToken,function(req,res){
    let addclass = {
        subject_id
    } = req.query;
    if (!(typeof subject_id === 'string')) {
        return res.json({"status":false,"message":"Invalid data provided"});
    }

    if(subject_id == '' || subject_id === undefined){
        return res.json({status:false,message:"Please Provide subject id",data:""});
    }


        connection.query("select * from chapters where subject_id=?",[subject_id], function(error,rows, fields){
            if(!!error)
             return done("error in this query");
            if(rows.length==0)
            {
                return res.json({status:false,"message":"There is no chapters in this Subject id"});
            }
            else
            {
                for(let i=0;i<rows.length;i++)
                {
                    if(rows[i].delete_flag==0){
                        rows[i].delete_flag=false;
                    }else{
                        rows[i].delete_flag=true;
                    }
                }
                return res.json({status:true,"message":"chpater list","data":rows});
            }
        });
    });

/**
 * @swagger
 * /api/v1/chapters:
 *   post:
 *     tags:
 *       - Chapter
 *     name: Insert New Chapter
 *     consumes:
 *       - multipart/form-data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         in: header
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *       - name: subject_id
 *         in: formData
 *         type: text
 *         required: true
 *       - name: chapter_name
 *         in: formData
 *         type: text
 *         required: true
 *       - name: chapter_image
 *         in: formData
 *         type: file
 *         required: true
 *     responses:
 *       '200':
 *         description: Added Subject successfully!!!
 */


    router.post('/chapters',verifyToken,function(req,res){
        upload(req, res, (error) => {
            let addclass = {
                subject_id,
                chapter_name
            } = req.body;
            if (req.fileValidationError) {
                return res.send(req.fileValidationError);
            } else if (!req.file) {
                return res.json({
                    status: false,
                    message: "Please select an image to upload"
                });
            } else if (error) {
                return res.json({
                    status: false,
                    message: "getting error ",
                    error: error
                });
            }
            if (!(typeof subject_id === 'string' ||
                    typeof chapter_name === 'string')) {
                return res.json({
                    "status": false,
                    "message": "Invalid data provided"
                });
            }
            if (subject_id == '' || subject_id === undefined) {
                return res.json({
                    status: false,
                    Message: "Please Select Class First."
                });
            }
            if (chapter_name == '' || chapter_name === undefined) {
                return res.json({
                    status: false,
                    Message: "Please Enter Subject Name."
                });
            }
            if (medium == '' || medium === undefined) {
                return res.json({
                    status: false,
                    Message: "Please Enter Subject Medium Name."
                });
            }
    
            connection.query('select * from subject WHERE chapter_name = ?  and subject_id=?', [chapter_name, subject_id], function (err, rows, fields) {
                if (err)
                    return res.json({
                        status: false,
                        message: "getting error",
                        error: err
                    });
                if (rows.length >= 1 && chapter_name === rows[0].chapter_name) {
                    return res.json({
                        "status": false,
                        "message": "Subject already exist"
                    });
                } else {
                    console.log(req.file.location)
                    connection.query('insert into subject(chapter_id,subject_id,chapter_name,medium,color_code,icons,created_timestamp,updated_timestamp) values(?,?,?,?,?,?,?,?)', [chapterId,subject_id, chapter_name, medium, color_code, req.file.location, Date.now(), Date.now()], function (error, rows, fields) {
                        if (error) {
                            return res.json({
                                status: false,
                                message: "getting error",
                                error: error
                            });
                        } else {
                            connection.query("select * from subject WHERE subject_id=?", [subject_id], function (err, rows) {
                                return res.json({
                                    "message": "Added Subject successfully!!!",
                                    "data": rows[0]
                                });
                            });
    
                        }
                    });
    
                }
            });
        });    
    });

/**
 * @swagger
 * /api/v1/chapters:
 *   put:
 *     tags:
 *       - Chapter
 *     description: Update existing Chapter
 *     consumes:
 *       - multipart/form-data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         in: header
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *       - name: subject_name
 *         in: formData
 *         type: text
 *         required: true
 *       - name: medium
 *         in: formData
 *         type: text
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully Updated
 */
router.put('/subjects', verifyToken, function (req, res) {
    upload(req, res, (error) => {

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        } else if (error) {
            return res.json({
                status: false,
                message: "getting error ",
                error: error
            });
        }
        let addclass = {
            chapter_id,
            chapter_name
        } = req.body;
        if (!(typeof chapter_id === 'string' ||
                typeof chapter_name === 'string')) {
            return res.json({
                "status": false,
                "message": "Invalid data provided"
            });
        }

        if (chapter_id == '' || chapter_id === undefined) {
            return res.json({
                status: false,
                Message: "Please Provide Chapter Id."
            });
        }
        if (chapter_name == '' || chapter_name === undefined) {
            return res.json({
                status: false,
                Message: "Please Provide Chapter Name."
            });
        }
       
        connection.query('select * from subject WHERE chapter_id', [chapter_id], function (error, rows, fields) {
            if (error)
                return res.json({
                    status: false,
                    message: "getting error",
                    error: error
                });
            if (rows.length = 0) {
                return res.json({
                    "status": false,
                    "message": "This Particular Chapter does not exist"
                });
            } else {

                let sql = 'UPDATE chapters SET chapter_name = ? ,  updated_timestamp=? WHERE chapter_id = ?';
                connection.query(sql, [chapter_name, medium, Date.now(), chapter_id], function (err, rows, fields) {
                    if (err) {
                        return res.json({
                            status: false,
                            message: "getting error",
                            error: err
                        });
                    } else {
                        connection.query('select * from chapters WHERE chapter_name = ?  and chapter_id=?', [chapter_name, chapters_id], function (error, rows, fields) {
                            return res.json({
                                "message": "Edit Subject successfully!!!",
                                "data": rows[0]
                            });
                        });
                    }
                });
            }
        });
    });
})
/**
 * @swagger
 * /api/v1/chapters:
 *   delete:
 *     tags:
 *       - Chapter
 *     description: Deletes existing Chapter
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             chapters_id:
 *                type: String
 *         required:
 *           - chapters_id
 *     responses:
 *       200:
 *         description: Class deleted successfully!!
 */

router.delete('/chapters', verifyToken, function (req, res) {
    connection.query('DELETE FROM chapters WHERE chapters_id=?', [req.body.chapters_id], function (err, rows, fields) {
        if (err) {
            return res.json({
                status: false,
                message: "getting error",
                error: err
            });
        } else {
            return res.json({
                "message": "Chapter deleted successfully!!"
            })
        }

    });
})

    module.exports = router;