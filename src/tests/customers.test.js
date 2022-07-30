const CustomerService = require('../modules/customers/services/CustomerService.js');
const CustomerRepo = require('../modules/customers/repositories/CustomerRepo');
const {
  mockCustomerList,
  mockCustomerResponse,
  mockCustomerItem,
  mockGetCustomerByNameResponse,
} = require('./mock.js');

describe('crud customer test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should collect customer from table', async () => {
    jest.spyOn(CustomerRepo, 'findAll').mockResolvedValue(mockCustomerList);
    const customers = await CustomerService.getCustomers();
    expect(customers.statusCode).toEqual(200);
    expect(JSON.parse(customers.body)).toEqual(mockCustomerResponse);
  });

  it('should return correctly customer with name is tmg1 from table', async () => {
    jest.spyOn(CustomerRepo, 'findOne').mockResolvedValue(mockCustomerItem);
    const customer = await CustomerService.getCustomerByName({
      pathParameters: { name: 'tmg1' },
    });
    expect(customer.statusCode).toEqual(200);
    expect(JSON.parse(customer.body)).toEqual(mockGetCustomerByNameResponse);
  });

  it('should insert item into table', async () => {
    jest.spyOn(CustomerRepo, 'create').mockResolvedValue(mockCustomerItem);
    const result = await CustomerService.createCustomer({
      body: '{\n    "name": "tmg2",\n    "email": "tmg2@gmail.com"\n}',
    });
    expect(result.statusCode).toEqual(201);
  });

  it('should delete item from table', async () => {
    jest.spyOn(CustomerRepo, 'findOne').mockResolvedValue(mockCustomerItem);
    jest.spyOn(CustomerRepo, 'delete').mockResolvedValue();
    const result = await CustomerService.deleteCustomer({
      pathParameters: { name: 'tmg1' },
    });
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual('{"message":"Successfully!!"}');
  });

  it('should update item from table', async () => {
    jest.spyOn(CustomerRepo, 'findOne').mockResolvedValue(mockCustomerItem);
    jest.spyOn(CustomerRepo, 'update').mockResolvedValue({
      Attributes: { email: 'tmg2@gmail.com', primary_key: 'tmg2' },
    });
    const result = await CustomerService.editCustomer({
      body: '{\n    "email": "tmg2@gmail.com"\n}',
      pathParameters: { name: 'tmg2' },
    });
    expect(result.statusCode).toEqual(200);
    expect(JSON.parse(result.body)).toEqual({
      data: {
        email: 'tmg2@gmail.com',
        primary_key: 'tmg2',
      },
    });
  });
});
