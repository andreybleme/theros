# theros

A simple and reliable tool to deploy static websites.


## What is theros?

Theros is a CLI tool to deploy static websites. It takes a website and upload it to an s3 bucket.

You can use `theros` to quickly create a new s3 bucket with the proper static website hosting configuration with a single command.

## Why

We need an alternative to manually uploading static websites to s3 buckets and repeatidly configuring its hosting policies. 
Some of the tools I found around to do so, was either not mantained anymore or not fast/simple enought.


## Installation


> npm install -g theros

### Testing

> npm run test

## Usage

You need to have your AWS account credentials: Access Key and Client Secret. 

If you don't have it, check [how to get your AWS security credentials](https://aws.amazon.com/pt/blogs/security/wheres-my-secret-access-key/).

#### Create

This command create a bucket pointing to `index.html` as the default root page, and `404.html` as the default error page.

> theros create --bucket <bucketname> --key <access_key> --secret <client_secret>
  
To create a bucket in a specific region (default is us-east-1), you can use `--region` parameter:


> theros create --bucket <bucketname> --key <access_key> --secret <client_secret> --region <availability_zone>


#### Deploy

Then you can deploy your site:

> theros deploy --bucket <bucketname> --key <access_key> --secret <client_secret>
  
  If your files are in a different folder, you can use `--root` parameter:
  
> theros deploy --bucket <bucketname> --key <access_key> --secret <client_secret> --root /user/folder
  
  
  ## License
  
  [MIT](https://github.com/andreybleme/theros/blob/master/LICENSE.md)
  
