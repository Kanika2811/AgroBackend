var mysql = require('mysql');
var dbconfig = require('../../../config/database');
var verifyToken = require('../../../config/Verify')
var connection = mysql.createConnection(dbconfig.connection);
var dateTime = require('node-datetime');
var dt = dateTime.create();
dt.format('Y-m-d H:M:S');
const express = require('express');
const router = express.Router();
connection.query('USE ' + dbconfig.database);
var CommonComponent = require("../../../config/CommonComponent");
const nanoid = require('nanoid/generate');
let subjectId = nanoid('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 10);
const color_code = '#00A1FF'
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
/**
 * @swagger
 * /api/v1/subjects:
 *   get:
 *     tags:
 *       - Subject
 *     name: Get All Subjects
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         in: header
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *       - name: class_id
 *         in: query
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Getting all classes
 *       401:
 *         description: Failed to authenticate token.
 *       403:
 *         description: No token provided.
 *       
 */
router.get('/subjects', verifyToken, function (req, res) {
    let getsubject = {
        class_id
    } = req.query;
    if (!(typeof class_id === 'string')) {
        return res.json({
            "status": false,
            "message": "Invalid data provided"
        });
    }

    if (class_id == '' || class_id === undefined) {
        return res.json({
            status: false,
            Message: "Please Select Class first"
        });
    }
    connection.query('select * from subject where class_id =?', [class_id], function (error, rows, fields) {
        if (error)
            return res.json({
                status: false,
                message: "getting error",
                error: error
            });
        if (rows.length == 0)
            return res.json({
                status: false,
                "message": "There is no subject in this Class"
            });
        else
            return res.json({
                status: true,
                "message": "subject list",
                "data": rows
            });
    });
})
/**
 * @swagger
 * /api/v1/subjects:
 *   post:
 *     tags:
 *       - Subject
 *     name: Insert New Subject
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
 *       - name: class_id
 *         in: formData
 *         type: text
 *         required: true
 *       - name: subject_name
 *         in: formData
 *         type: text
 *         required: true
 *       - name: medium
 *         in: formData
 *         type: text
 *         required: true
 *       - name: subject_image
 *         in: formData
 *         type: file
 *         required: true
 *     responses:
 *       '200':
 *         description: Added Subject successfully!!!
 */

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'mrb-data/SubjectImage',
        acl: 'public-read',
        key: function (req, file, cb) {
            console.log(file.originalname)
            cb(null, file.originalname)
        }
    })
}).single('subject_image');

router.post('/subjects', verifyToken, function (req, res) {

   
    upload(req, res, (error) => {
        let addclass = {
            class_id,
            subject_name,
            medium
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
        if (class_id == '' || class_id === undefined) {
            return res.json({
                status: false,
                Message: "Please Select Class First."
            });
        }
        if (subject_name == '' || subject_name === undefined) {
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

        connection.query('select * from subject WHERE subject_name = ? and medium=? and class_id=?', [subject_name, medium, class_id], function (err, rows, fields) {
            if (err)
                return res.json({
                    status: false,
                    message: "getting error",
                    error: err
                });
            if (rows.length >= 1 && subject_name === rows[0].subject_name) {
                return res.json({
                    "status": false,
                    "message": "Subject already exist"
                });
            } else {
                console.log(req.file.location)
                connection.query('insert into subject(subject_id,class_id,subject_name,medium,color_code,icons,created_timestamp,updated_timestamp) values(?,?,?,?,?,?,?,?)', [subjectId, class_id, subject_name, medium, color_code,req.file.location, Date.now(), Date.now()], function (error, rows, fields) {
                    if (error) {
                        return res.json({
                            status: false,
                            message: "getting error",
                            error: error
                        });
                    } else {
                        connection.query("select * from subject WHERE class_id=?", [class_id], function (err, rows) {
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

})

/**
 * @swagger
 * /api/v1/subjects:
 *   put:
 *     tags:
 *       - Subject
 *     description: Update existing Subject
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             class_id:
 *               type: string
 *             subject_id:
 *               type: string
 *             subject_name:
 *               type: string
 *             medium:
 *               type: integer
 *         required:
 *           - class_id
 *           - subject_id
 *           - subject_name
 *           - medium
 *         
 *     responses:
 *       200:
 *         description: Successfully Updated
 */
router.put('/subjects', verifyToken, function (req, res) {

    let addclass = {
        class_id,
        subject_id,
        subject_name,
        medium
    } = req.body;
    if (!(typeof class_id === 'string' ||
            typeof subject_id === 'string' ||
            typeof subject_name === 'string' ||
            typeof medium === 'string')) {
        return res.json({
            "status": false,
            "message": "Invalid data provided"
        });
    }

    if (class_id == '' || class_id === undefined) {
        return res.json({
            status: false,
            Message: "Please Provide Class Id."
        });
    }
    if (subject_id == '' || subject_id === undefined) {
        return res.json({
            status: false,
            Message: "Please Provide Subject Id."
        });
    }
    if (subject_name == '' || subject_name === undefined) {
        return res.json({
            status: false,
            Message: "Please Provide Subject Name."
        });
    }
    if (medium == '' || medium === undefined) {
        return res.json({
            status: false,
            Message: "Please Provide Subject Medium Name."
        });
    }
    connection.query('select * from subject WHERE subject_name = ? and medium=? and class_id=?', [subject_name, medium, class_id], function (error, rows, fields) {
        if (error)
            return res.json({
                status: false,
                message: "getting error",
                error: error
            });
        if (rows.length >= 1 && subject_name === rows[0].subject_name) {
            return res.json({
                "status": false,
                "message": "Subject already exist"
            });
        } else {

            let sql = 'UPDATE subject SET subject_name = ? , medium=?, updated_timestamp=? WHERE id = ? and class_id=?';
            connection.query(sql, [subject_name, medium, Date.now(), subject_id, class_id], function (err, rows, fields) {
                if (err) {
                    return res.json({
                        status: false,
                        message: "getting error",
                        error: err
                    });
                } else {
                    connection.query('select * from subject WHERE subject_name = ? and medium=? and class_id=?', [subject_name, medium, class_id], function (error, rows, fields) {
                        return res.json({
                            "message": "Edit Subject successfully!!!",
                            "data": rows[0]
                        });
                    });
                }
            });
        }
    });
})
/**
 * @swagger
 * /api/v1/subjects:
 *   delete:
 *     tags:
 *       - Subject
 *     description: Deletes existing Subject
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             class_name:
 *                type: String
 *         required:
 *           - class_name
 *     responses:
 *       200:
 *         description: Class deleted successfully!!
 */

router.delete('/subjects', verifyToken, function (req, res) {
    connection.query('DELETE FROM subject WHERE subject_id=?', [req.body.subject_id], function (err, rows, fields) {
        if (err) {
            return res.json({
                status: false,
                message: "getting error",
                error: err
            });
        } else {
            return res.json({
                "message": "Subject deleted successfully!!"
            })
        }

    });
})

module.exports = router;