'use strict';

const middy = require('@middy/core');
const {EventBridgeClient, PutEventsCommand} =
  require('@aws-sdk/client-eventbridge');

const handler = async (event, context) => {
  console.log('source event:', event, 'context:', context);
  return event;
};

const putEvents = async (DetailType, request) => {
  const client = new EventBridgeClient({
    region: 'us-east-1',
    endpoint: 'http://10.0.2.2:4566', // sudo ifconfig lo0 alias 10.0.2.2 up
  });
  return await client.send(
      new PutEventsCommand({
        Entries: [
          {
            Detail: JSON.stringify({
              lambdaInputEvent: request.event,
              message: 'BME!',
            }),
            DetailType,
            EventBusName: 'lambda-middleware',
            Source: 'source',
            Time: new Date(),
          },
        ],
      }));
};

// const middlewareDefaults = {};

const middleware = (opts = {}) => {
  // const options = {...middlewareDefaults, ...opts};

  const before = async (request) => {
    console.log('source before request', JSON.stringify({request}));
    const output = await putEvents('before', request);
    console.log('source before output', output);
  };

  const after = async (request) => {
    console.log('source after request', request);
    const output = await putEvents('after', request);
    console.log('source after output', output);
  };

  const onError = async (request) => {
    console.log('source onError request', request);
    // const output = await putEvents('onError', request);
    // console.log('source onError output', output);
  };

  return {before, after, onError};
};

const handlerMiddy = middy(handler).use(middleware());

module.exports = {handler: handlerMiddy};
