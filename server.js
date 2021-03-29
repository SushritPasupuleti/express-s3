require('dotenv').config()

var express = require('express'),
    aws = require('aws-sdk'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    multerS3 = require('multer-s3');

aws.config.update({
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey,
    region: 'ap-south-1'
});

var app = express(),
    s3 = new aws.S3();

app.use(bodyParser.json());

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWSBucketName,
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname + Date.now()) //use Date.now() for unique file keys
        },
    })
});

//open in browser to see upload form
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');//index.html is inside node-cheat
});

//use by upload form
app.post('/upload', upload.single('file'), function (req, res, next) {
    res.send({
        success: 1,
        file: {
            url: req.file.location
        }
    });
});

///ignore this is for editorjs upload endpoint
app.post('/upload-img', upload.single('image'), function (req, res, next) {
    res.send({
        success: 1,
        file: {
            url: req.file.location
        }
    });
});

app.listen(5000, function () {
    console.log('Server listening on port 5000!');
});