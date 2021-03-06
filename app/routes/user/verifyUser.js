
const express = require('express');
const router = express.Router();

var mysql = require('mysql');
var dbconfig = require('../../../config/database');
var connection = mysql.createConnection(dbconfig.connection);
var dateTime = require('node-datetime');
var dt = dateTime.create();
dt.format('Y-m-d H:M:S');
connection.query('USE ' + dbconfig.database);
/**
 * @swagger
 * /api/v1/VerifyOTP:
 *   post:
 *     tags:
 *       - Verify OTP
 *     name: Verify User with OTP
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             contact_no:
 *               type: string
 *             otp:
 *               type: string
 *         required:
 *           - contact_no
 *           - otp
 *     responses:
 *       '200':
 *         description: User verified successfully!!!
 */

router.post('/VerifyOTP', async (req, res) => {

    let addclass = {
        contact_no,
        otp
        } = req.body;
    if (!(typeof contact_no === 'string' ||
    typeof otp === 'string' )) {
        return res.json({"status":false,"message":"Invalid data provided"});
    }
    if(contact_no == '' || contact_no === undefined){
        return res.json({status:false,message:"Please Provide Contact Number"});
    }
    if(otp == '' || otp === undefined){
        return res.json({status:false,message:"Please Provide otp"});
    }

    connection.query("SELECT * FROM my_schema.users WHERE contact_no = ?",[contact_no], function(err, rows) {
        if (err)
            return  res.json({status:false,message:"getting error",error:err});
      
       if(rows.length){
           if(rows[0].is_verified==0)
           {
                if(otp == rows[0].otp){
                    let sql ='UPDATE  users SET is_verified = ?,updated_timestamp=? WHERE contact_no = ?';
                    connection.query(sql,["1",Date.now(),contact_no], function(err, rows,fields) {
                        if(!err){
                            connection.query("SELECT * FROM my_schema.users WHERE contact_no = ?",[contact_no], function(err, rows) {
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
                                return res.json({status:true,message:"User verified successfully!!!","data":rows[0]});
                            });
                        }
                        else{
                            return  res.json({status:false,message:"getting error",error:err});
                        }
                    });
                }
                else{
                    return res.json({"status":false,"message":"Entered Incorrect OTP"});
                }
           }
           else{
            return res.json({"status":false,"message":"This user is already verified!!.."});
           }
            
        }
        else{
            return res.json({status:false,message:"This user is not exist."});
       }
    });

});

module.exports = router;