"use strict";

var crypt = require('./crypt');
var util = require('util');
var crypto = require('crypto');


//mandatory flag: when it set, only mandatory parameters are added to checksum

function paramsToString(params, mandatoryflag) {
  var data = '';
  var tempKeys = Object.keys(params);
  tempKeys.sort();
  tempKeys.forEach(function (key) {
  var n = params[key].includes("REFUND"); 
   var m = params[key].includes("|");  
        if(n == true )
        {
          params[key] = "";
        }
          if(m == true)
        {
          params[key] = "";
        }  
    if (key !== 'CHECKSUMHASH' ) {
      if (params[key] === 'null') params[key] = '';
      if (!mandatoryflag || mandatoryParams.indexOf(key) !== -1) {
        data += (params[key] + '|');
      }
    }
});
  return data;
}


function genchecksum(params, key, cb) {
  var data = paramsToString(params);
crypt.gen_salt(4, function (err, salt) {
    var sha256 = crypto.createHash('sha256').update(data + salt).digest('hex');
    var check_sum = sha256 + salt;
    var encrypted = crypt.encrypt(check_sum, key);
    cb(undefined, encrypted);
  });
}
function genchecksumbystring(params, key, cb) {

  crypt.gen_salt(4, function (err, salt) {
    var sha256 = crypto.createHash('sha256').update(params + '|' + salt).digest('hex');
    var check_sum = sha256 + salt;
    var encrypted = crypt.encrypt(check_sum, key);

     var CHECKSUMHASH = encodeURIComponent(encrypted);
     CHECKSUMHASH = encrypted;
    cb(undefined, CHECKSUMHASH);
  });
}

function verifychecksum(params, key, checksumhash) {
  var data = paramsToString(params, false);

  //TODO: after PG fix on thier side remove below two lines
  if (typeof checksumhash !== "undefined") {
    checksumhash = checksumhash.replace('\n', '');
    checksumhash = checksumhash.replace('\r', '');
    var temp = decodeURIComponent(checksumhash);
    var checksum = crypt.decrypt(temp, key);
    var salt = checksum.substr(checksum.length - 4);
    var sha256 = checksum.substr(0, checksum.length - 4);
    var hash = crypto.createHash('sha256').update(data + salt).digest('hex');
    if (hash === sha256) {
      return true;
    } else {
      util.log("checksum is wrong");
      return false;
    }
  } else {
    util.log("checksum not found");
    return false;
  }
}

function verifychecksumbystring(params, key,checksumhash) {

    var checksum = crypt.decrypt(checksumhash, key);
    var salt = checksum.substr(checksum.length - 4);
    var sha256 = checksum.substr(0, checksum.length - 4);
    var hash = crypto.createHash('sha256').update(params + '|' + salt).digest('hex');
    if (hash === sha256) {
      return true;
    } else {
      util.log("checksum is wrong");
      return false;
    }
  } 

function genchecksumforrefund(params, key, cb) {
  var data = paramsToStringrefund(params);
crypt.gen_salt(4, function (err, salt) {
    var sha256 = crypto.createHash('sha256').update(data + salt).digest('hex');
    var check_sum = sha256 + salt;
    var encrypted = crypt.encrypt(check_sum, key);
      params.CHECKSUM = encodeURIComponent(encrypted);
    cb(undefined, params);
  });
}

function paramsToStringrefund(params, mandatoryflag) {
  var data = '';
  var tempKeys = Object.keys(params);
  tempKeys.sort();
  tempKeys.forEach(function (key) {
   var m = params[key].includes("|");  
          if(m == true)
        {
          params[key] = "";
        }  
    if (key !== 'CHECKSUMHASH' ) {
      if (params[key] === 'null') params[key] = '';
      if (!mandatoryflag || mandatoryParams.indexOf(key) !== -1) {
        data += (params[key] + '|');
      }
    }
});
  return data;
}

module.exports.genchecksum = genchecksum;
module.exports.verifychecksum = verifychecksum;
module.exports.verifychecksumbystring = verifychecksumbystring;
module.exports.genchecksumbystring = genchecksumbystring;
module.exports.genchecksumforrefund = genchecksumforrefund;



/* ---------------- TEST CODE ---------------- */
module.exports = {
  

  generate_checksum :function(req,res,user_id,subscription_id) {
       var ver_param ={};
  
      ver_param['MID']= 'STNikm10169772547719';
      ver_param['ORDER_ID']= req.body.subscription_id;
      ver_param['CUST_ID']= req.body.user_id;
        ver_param['TXN_AMOUNT']=1;
        ver_param['CHANNEL_ID']='WEB';
        ver_param['INDUSTRY_TYPE_ID']='Retail';
        ver_param['WEBSITE']='WEBSTAGING';
        ver_param['CALLBACK_URL']='https://securegw-stage.paytm.in/order/process';

    genchecksum(ver_param, "byElawQhIP%gTDtB", function (err, res) {
      if (err)
            return  res.json({status:false,message:"getting error when generate checksum",error:err});
      else
      res.send({status:200,message : 'Checksum generated successfully',data:{checksum:res}})
     
    });
   

  },

  verified_checksum :function(user_id,subscription_id) {
    var ver_param ={};

   ver_param['MID']= 'STNikm10169772547719';
   ver_param['ORDER_ID']= subscription_id;
   ver_param['CUST_ID']= user_id;
     ver_param['TXN_AMOUNT']=1;
     ver_param['CHANNEL_ID']='WEB';
     ver_param['INDUSTRY_TYPE_ID']='Retail';
     ver_param['WEBSITE']='WEBSTAGING';
     ver_param['CALLBACK_URL']='https://securegw-stage.paytm.in/order/process';

 genchecksum(ver_param, "byElawQhIP%gTDtB", function (err, res) {
   
   if (verifychecksum(ver_param, "byElawQhIP%gTDtB",res)) {
     res.send({status:true,message : 'Checksum verified'})
   } else {
     res.send({status:false,message : 'Checksum Verification Failed'})
   }
 });


}
}



