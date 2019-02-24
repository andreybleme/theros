/**
 * Module dependencies.
 */

var program = require('commander');

program
  .command('create')
  .option('-b, --bucket <s>', 'Bucket name', setBucket)
  .option('-k, --key <s>', 'AWS Key', setKey)
  .option('-s, --secret <s>', 'AWS Secret', setSecret)
  .action(function () {
    console.log('key: ' + awsAuth.key + ', secret: ' + awsAuth.secret + ', bucket: ' + bucket)
  })

program
  .command('deploy')
  .option('-b, --bucket <s>', 'Bucket name', setBucket)
  .option('-k, --key <s>', 'AWS Key', setKey)
  .option('-s, --secret <s>', 'AWS Secret', setSecret)
  .action(function () {
    console.log('key: ' + awsAuth.key + ', secret: ' + awsAuth.secret + ', bucket: ' + bucket)
  })


let awsAuth = {
  key: '',
  secret: ''
}

let bucket

function setKey(val) {
  awsAuth.key = val
}

function setSecret(val) {
  awsAuth.secret = val
}

function setBucket(val) {
	bucket = val
}


program.parse(process.argv)