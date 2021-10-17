'use strict';

const middy = require('@middy/core');

const {EventBridgeClient, PutEventsCommand} =
  require('@aws-sdk/client-eventbridge');


// This allows the Lambda function running in LocalStack to put events onto
// EventBridge also running on LocalStack. LocalStack must be running using
// the LocalStack docker-compose.yml file with the following edits (instead)
// of 127.0.0.1.
//
//   ports:
//     - "53:53"
//     - "53:53/udp"
//     - "443:443"
//     - "4566:4566"
//     - "4571:4571"
//
// Furthmore the host OS must add 10.0.2.2 as a loopback address.
//   sudo ifconfig lo0 alias 10.0.2.2 up
//
const AWS_ENDPOINT = 'http://10.0.2.2:4566';


const handler = async (event, context) => {
  return {message: 'Hello, world!'};
};


// A utility function used in the middleware.
const putEvents = async (status, request) => {
  const client = new EventBridgeClient({
    region: 'us-east-1',
    endpoint: AWS_ENDPOINT,
  });
  return await client.send(
      new PutEventsCommand({
        Entries: [
          {
            Detail: JSON.stringify({
              invokedFunctionArn: request.context.invokedFunctionArn,
              awsRequestId: request.context.awsRequestId,
              functionName: request.context.functionName,
              functionVersion: request.context.functionVersion,
              input: request.event,
              output: request.response,
              error: request.error,
              status,
              request,
            }),
            DetailType: 'Lambda Invocation Status Change',
            EventBusName: 'lambda-middleware',
            Source: 'source',
            Time: new Date(),
          },
        ],
      }));
};


// The middleware that publishes invocation lifecycle events.
const middleware = () => {
  const before = async (request) => {
    console.log('middleware before');
    await putEvents('RUNNING', request);
  };

  const after = async (request) => {
    console.log('middleware after');
    await putEvents('SUCCEEDED', request);
  };

  const onError = async (request) => {
    console.log('middleware onError');
    await putEvents('FAILED', request);
  };

  return {before, after, onError};
};

const handlerMiddy = middy(handler).use(middleware());

module.exports = {handler: handlerMiddy};
