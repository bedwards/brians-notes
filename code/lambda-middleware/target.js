'use strict';

const handler = async (event, context) => {
  console.log('target event:', event, 'context:', context);
  return event;
};

module.exports = {handler};
