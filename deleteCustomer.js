'use strict';
const { dynamodb } = require('./dynamodb-config');
const GetCustomerByName = require('./getCustomerByName');

module.exports.deleteCustomer = async (event) => {
  const customerName = event.pathParameters.name;
  const customer = await GetCustomerByName.findOne(customerName);
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

  await this.delete(customerName);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Successfully!!',
    }),
  };
};

module.exports.delete = async (customerName) => {
  const scanParams = {
    TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
    Key: {
      primary_key: customerName,
    },
  };

  await dynamodb.delete(scanParams).promise();
};
