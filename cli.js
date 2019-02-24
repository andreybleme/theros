/**
 * Module dependencies.
 */

var program = require('commander');
var AWS = require('aws-sdk');


program
  .command('create')
  .option('-b, --bucket <s>', 'Bucket name', setBucket)
  .option('-k, --key <s>', 'AWS Key', setKey)
  .option('-s, --secret <s>', 'AWS Secret', setSecret)
  .action(function () {
    // setup credentials
    AWS.config.update(awsCredentials);

    // create bucket
    s3 = new AWS.S3();
    s3.createBucket(bucketParams, function(err, data) {
      if (err) {
        console.log('Error', err);
      } else {
        console.log('Success', data.Location);

        // set static website policies
        staticHostParams.Bucket = bucketParams.Bucket
        staticHostParams.WebsiteConfiguration.IndexDocument.Suffix = 'index.html'
        staticHostParams.WebsiteConfiguration.ErrorDocument.Key = 'error.html'

        s3.putBucketWebsite(staticHostParams, function(err, data) {
          if (err) {
            console.log('Error', err);
          } else {
            console.log('Success', data);
          }
        });
      }
    });

    console.log('key: ' + awsCredentials.accessKeyId + ', secret: ' + awsCredentials.secretAccessKey + ', bucket: ' + bucketParams.Bucket)
  })

program
  .command('deploy')
  .option('-b, --bucket <s>', 'Bucket name', setBucket)
  .option('-k, --key <s>', 'AWS Key', setKey)
  .option('-s, --secret <s>', 'AWS Secret', setSecret)
  .action(function () {
    console.log('key: ' + awsCredentials.accessKeyId + ', secret: ' + awsCredentials.secretAccessKey + ', bucket: ' + bucketParams.Bucket)
  })


let awsCredentials = {
  region: 'us-west-1',
  accessKeyId: '',
  secretAccessKey: ''
}

let bucketParams = {
  Bucket : ''
}

let staticHostParams = {
  Bucket: '',
  WebsiteConfiguration: {
    ErrorDocument: {
      Key: ''
    },
    IndexDocument: {
      Suffix: ''
    },
  }
}

function setKey(val) {
  awsCredentials.accessKeyId = val
}

function setSecret(val) {
  awsCredentials.secretAccessKey = val
}

function setBucket(val) {
  bucketParams.Bucket = val
}

program.parse(process.argv)