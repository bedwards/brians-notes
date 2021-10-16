const middy = require('@middy/core');
const { EventBridgeClient, PutEventsCommand } = require("@aws-sdk/client-eventbridge");

const handler = async function (event, context) {
  console.log('hello event:', event, 'context:', context);
  return event;
};

const middlewareDefaults = {}

const middleware = (opts = {}) => {
  const options = { ...middlewareDefaults, ...opts }

  const client = new EventBridgeClient({
    region: "us-east-1",
    endpoint: "http://localhost:4566"
  });

  const before = async (request) => {
    console.log('before request', request);

    const command = new PutEventsCommand({
        Entries: [
          {
            Detail: JSON.stringify({request}),
          }
        ] 
     });

    const output = await client.send(command);
    console.log("before output", output);
  };

  const after = async (request) => {
  };

  const onError = async (request) => {
  };

  return { before, after, onError };
};

const hello = middy(handler).use(middleware());

module.exports = { hello };
