'use strict';
const CustomerRepo = require('../repositories/CustomerRepo');

const createCustomer = async (event) => {
  const body = JSON.parse(event.body);
  await CustomerRepo.create(body);

  return {
    statusCode: 201,
  };
};

const getCustomers = async (_event) => {
  const result = await CustomerRepo.findAll();
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

const getCustomerByName = async (event) => {
  const customerName = event.pathParameters.name;
  const customer = await CustomerRepo.findOne(customerName);
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

const editCustomer = async (event) => {
  const customerName = event.pathParameters.name;
  const body = JSON.parse(event.body);
  const customer = await CustomerRepo.findOne(customerName);
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

  const result = await CustomerRepo.update(customerName, body);
  return {
    statusCode: 200,
    body: JSON.stringify({
      data: result.Attributes,
    }),
  };
};

const deleteCustomer = async (event) => {
  const customerName = event.pathParameters.name;
  const customer = await CustomerRepo.findOne(customerName);
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

  await CustomerRepo.delete(customerName);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Successfully!!',
    }),
  };
};

module.exports = {
  createCustomer,
  getCustomers,
  getCustomerByName,
  editCustomer,
  deleteCustomer,
};
