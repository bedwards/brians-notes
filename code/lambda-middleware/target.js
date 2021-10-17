'use strict';

const handler = async (event, context) => {
  switch (event.detail.status) {
    case 'RUNNING':
      console.log('Running:', JSON.stringify(event.detail.input));
      break;
    case 'SUCCEEDED':
      console.log('Succeeded:', JSON.stringify(event.detail.output.message));
      break;
    case 'FAILED':
      console.log('Failed:', JSON.stringify(event.error));
      break;
    default:
      throw new Error('Unsupported status:', status);
  }
  return event;
};

module.exports = {handler};
