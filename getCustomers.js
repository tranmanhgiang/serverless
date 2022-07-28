'use strict';
const { dynamodb } = require('./dynamodb-config');

module.exports.getCustomers = async (_event) => {
  const result = await this.findAll();
  if (result.Count === 0) {
    return {
      statusCode: 404,
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      total: result.Count,
      items: result.Items.map((customer) => {
        return {
          name: customer.primary_key,
          email: customer.email,
        };
      }),
    }),
  };
};

module.exports.findAll = async () => {
  const scanParams = {
    TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
  };

  const result = await dynamodb.scan(scanParams).promise();
  return result;
};
