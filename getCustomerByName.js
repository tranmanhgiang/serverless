'use strict';
const { dynamodb } = require('./dynamodb-config');

module.exports.getCustomerByName = async (event) => {
  const customerName = event.pathParameters.name;
  const customer = await this.findOne(customerName);
  if (
    customer &&
    Object.keys(customer).length === 0 &&
    Object.getPrototypeOf(customer) === Object.prototype
  ) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: 'Customer Not Found!',
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      customer,
    }),
  };
};

module.exports.findOne = async (name) => {
  const scanParams = {
    TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
    Key: {
      primary_key: name,
    },
  };

  const customer = await dynamodb.get(scanParams).promise();
  return customer;
};
