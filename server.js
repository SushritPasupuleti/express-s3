const express = require('express');
const app = express();
const multer  = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: 'access-key-id',
    secretAccessKey: 'secret-access-key'
});