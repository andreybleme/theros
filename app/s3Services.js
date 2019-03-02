const AWS = require('aws-sdk')

function setAwsCredentials(awsCredentials) {
  AWS.config.update(awsCredentials)
}

function createBucket(bucketParams, staticHostParams) {
  const s3 = new AWS.S3()
  s3.createBucket(bucketParams, function(err, data) {
    if (err) {
      console.log('Error', err)
    } else {
      console.log('Success creating bucket at ', data.Location)
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
    ACL: 'public-read'
  }, function(error, dataS3) {
    if (error) {
      return console.log('There was an error uploading your file: ', error.message)
    }
    console.log('Successfully uploaded file.')
  });
}

function setPoliciesForWebSiteHosting(staticHostParams) {
  const s3 = new AWS.S3()
  s3.putBucketWebsite(staticHostParams, function(err, data) {
    if (err) {
      console.log('Error', err)
    } else {
      console.log('Success')
    }
  });
}

module.exports = {
  setAwsCredentials,
  createBucket,
  uploadObject,
};
