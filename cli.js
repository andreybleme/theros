#!/usr/bin/env node

const program = require('commander')
const filesystem = require('./app/filesystem')
const s3Services = require('./app/s3Services')

const awsCredentials = {
  region: 'us-east-1',
  accessKeyId: '',
  secretAccessKey: ''
}

const bucketParams = {
  Bucket : ''
}

const staticHostParams = {
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

let rootFolder = '.'
let ignored = []

program
  .command('create')
  .option('-b, --bucket <s>', 'Bucket name', setBucket)
  .option('-r, --region <s>', 'Bucket region (default: us-east-1)', setRegion)
  .option('-k, --key <s>', 'AWS Key', setKey)
  .option('-s, --secret <s>', 'AWS Secret', setSecret)
  .action(function () {
    s3Services.setAwsCredentials(awsCredentials)

    staticHostParams.Bucket = bucketParams.Bucket
    staticHostParams.WebsiteConfiguration.IndexDocument.Suffix = 'index.html'
    staticHostParams.WebsiteConfiguration.ErrorDocument.Key = 'error.html'
    s3Services.createBucket(bucketParams, staticHostParams)
  })

program
  .command('deploy')
  .option('-b, --bucket <s>', 'Bucket name', setBucket)
  .option('-k, --key <s>', 'AWS Key', setKey)
  .option('-s, --secret <s>', 'AWS Secret', setSecret)
  .option('-r, --root <s>', 'Root path', setRootFolder)
  .option('-e, --ignore <items>', 'Ignore files', setIgnore)
  .action(function () {
    s3Services.setAwsCredentials(awsCredentials)

    filesystem.getAllFilesFrom(rootFolder, function (filePath, data) {
      if (rootFolder !== '.') {
        filePath = filePath.replace(rootFolder, '')
      }
      if(!ignored.includes(filePath)) {
        s3Services.uploadObject(bucketParams.Bucket, filePath, data)
      }
    })
  })

function setKey(val) {
  awsCredentials.accessKeyId = val
}

function setSecret(val) {
  awsCredentials.secretAccessKey = val
}

function setRegion(val) {
  awsCredentials.region = val
}

function setBucket(val) {
  bucketParams.Bucket = val
}

function setRootFolder(val) {
  rootFolder = val
}

function setIgnore(val) {
  ignored = val.split(',')
}

program.parse(process.argv)
