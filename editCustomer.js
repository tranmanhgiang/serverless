'use strict';
const { dynamodb } = require('./dynamodb-config');
const GetCustomerByName = require('./getCustomerByName');

module.exports.editCustomer = async (event) => {
  const customerName = event.pathParameters.name;
  const body = JSON.parse(event.body);
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

  const result = await this.update(customerName, body);
  return {
    statusCode: 200,
    body: JSON.stringify({
      data: result.Attributes,
    }),
  };
};

module.exports.update = async (customerName, body) => {
  const scanParams = {
    TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
    Key: {
      primary_key: customerName,
    },
    ExpressionAttributeValues: {
      ':email': body.email,
    },
    UpdateExpression: 'set email = :email',
    ReturnValues: 'ALL_NEW',
  };

  const customer = await dynamodb.update(scanParams).promise();
  return customer;
};
