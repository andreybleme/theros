/**
 * Module dependencies.
 */
const program = require('commander')
const AWS = require('aws-sdk')
const filesystem = require('./app/filesystem')


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

program
  .command('create')
  .option('-b, --bucket <s>', 'Bucket name', setBucket)
  .option('-k, --key <s>', 'AWS Key', setKey)
  .option('-s, --secret <s>', 'AWS Secret', setSecret)
  .action(function () {
    // setup credentials
    AWS.config.update(awsCredentials)

    // create bucket
    let s3 = new AWS.S3()
    s3.createBucket(bucketParams, function(err, data) {
      if (err) {
        console.log('Error', err)
      } else {
        console.log('Success', data.Location)

        // set static website policies
        staticHostParams.Bucket = bucketParams.Bucket
        staticHostParams.WebsiteConfiguration.IndexDocument.Suffix = 'index.html'
        staticHostParams.WebsiteConfiguration.ErrorDocument.Key = 'error.html'

        s3.putBucketWebsite(staticHostParams, function(err, data) {
          if (err) {
            console.log('Error', err)
          } else {
            console.log('Success', data)
          }
        });
      }
    });

  })

program
  .command('deploy')
  .option('-b, --bucket <s>', 'Bucket name', setBucket)
  .option('-k, --key <s>', 'AWS Key', setKey)
  .option('-s, --secret <s>', 'AWS Secret', setSecret)
  .action(function () {
    // setup credentials
    AWS.config.update(awsCredentials)
    let s3 = new AWS.S3()

    filesystem.getAllFilesFrom('./root', function (filePath, data) {
      s3.putObject({
        Bucket: bucketParams.Bucket,
        Key: filePath,
        Body: data,
        ACL: 'public-read'
      }, function(error, dataS3) {
        if (error) {
          return console.log('There was an error uploading your file: ', error.message)
        }
        console.log('Successfully uploaded file.')
      });
    })

  });

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
