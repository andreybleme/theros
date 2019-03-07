const AWS = require('aws-sdk')
const filesystem = require('./filesystem')

function setAwsCredentials(awsCredentials) {
  AWS.config.update(awsCredentials)
}

function createBucket(bucketParams, staticHostParams) {
  const s3 = new AWS.S3()
  s3.createBucket(bucketParams, function(err, data) {
    if (err) {
      console.log('Error creating bucket: ', err)
    } else {
      console.log('Successfully created bucket at ', data.Location)
      setPoliciesForWebSiteHosting(staticHostParams)
    }
  });
}

function uploadObject(bucket, filePath, data) {
  const s3 = new AWS.S3()
  s3.putObject({
    Bucket: bucket,
    Key: filePath,
    Body: data,
    ACL: 'public-read',
    ContentType: filesystem.getMimeType(filePath)
  }, function(error, dataS3) {
    if (error) {
      return console.log('There was an error uploading your file: ', error.message)
    }
    console.log('Successfully uploaded file: ', filePath)
  });
}

function setPoliciesForWebSiteHosting(staticHostParams) {
  const s3 = new AWS.S3()
  s3.putBucketWebsite(staticHostParams, function(err, data) {
    if (err) {
      console.log('Error defining policies: ', err)
    } else {
      console.log('Successfully defined static hosting policies.')
    }
  });
}

module.exports = {
  setAwsCredentials,
  createBucket,
  uploadObject,
};
