'use strict';
const { dynamodb } = require('./dynamodb-config');

module.exports.createCustomer = async (event) => {
  const body = JSON.parse(event.body);
  await this.create(body);

  return {
    statusCode: 201,
  };
};

module.exports.create = async (customer) => {
  const putParams = {
    TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
    Item: {
      primary_key: customer.name,
      email: customer.email,
    },
  };
  await dynamodb.put(putParams).promise();
};
