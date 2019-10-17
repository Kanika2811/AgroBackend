const AWS = require('aws-sdk');
const childProcess = require('child_process');
const CronJob = require('cron').CronJob;

var username = "root";
var password = "root";
var databaseName = "demo";
var moment = require("moment");

var createKey = (()=> {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth()+1;
    var key  = year + "/" + month + "/" + databaseName + '-' + moment().format('YYYY-MM-DD-HH-mm-ss') + '.sql';
    return key;
});

var uploadToS3 = ((key, buffer)=> {
    AWS.config = new AWS.Config();
    AWS.config.accessKeyId = "your amazon access key";
    AWS.config.secretAccessKey = "your amazon access secret";
    var s3 = new AWS.S3();
    s3.putObject({
        Bucket: "bucket-name",
        Key: key,
        Body: buffer
    }, function (err, resp) {
        if (err) {
            console.log("Error in uploading image to s3", err);
            return;
        }
        console.log("Dump process done")
    });
});

var takingDump = (()=> {
    var dumpCommand = `mysqldump -u${username} -p${password} ${databaseName}`;
    //dumpCommand mysqldump -uroot -proot demo
    childProcess.exec(dumpCommand, (error, stdout, stderr)=> {
        var bufferData = Buffer.from(stdout, 'utf8');
        uploadToS3(createKey(), bufferData);
    });
});

//Taking a dump every day
var job = new CronJob('00 00 10 * * *', function () {
        takingDump();
    }, function () {
    },
    true, // Start the job right now
    "Africa/Bissau" //!* UTC Time 00:00*!/
);
//If you want to take dump now
takingDump();