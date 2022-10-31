const AWS = require('aws-sdk');
const queueUrl = 'https://sqs.us-east-1.amazonaws.com/879585112963/alura-test';
 
const sendMessage = async (messageBody = 'empty') => {
   const sqs = new AWS.SQS({region: 'us-east-1'});
   const a = await sqs.sendMessage({
       QueueUrl: queueUrl,
       MessageBody: messageBody
   }).promise();
};
 
sendMessage(process.argv[2]);