const { dynamodb } = require('../../../../dynamodb-config');

module.exports = {
  async create(customer) {
    const putParams = {
      TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
      Item: {
        primary_key: customer.name,
        email: customer.email,
      },
    };
    await dynamodb.put(putParams).promise();
  },

  async findAll() {
    const scanParams = {
      TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
    };
    const result = await dynamodb.scan(scanParams).promise();
    return result;
  },

  async findOne(name) {
    const scanParams = {
      TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
      Key: {
        primary_key: name,
      },
    };
    const customer = await dynamodb.get(scanParams).promise();
    return customer;
  },

  async update(customerName, body) {
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
  },

  async delete(customerName) {
    const scanParams = {
      TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
      Key: {
        primary_key: customerName,
      },
    };

    await dynamodb.delete(scanParams).promise();
  },
};
