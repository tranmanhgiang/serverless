const mockCustomerList = {
  Items: [
    { email: 'tmg1@gmail.com', primary_key: 'tmg1' },
    {
      primary_key: 'Gareth Mc Cumskey 1',
      email: 'gareth@mccumskey2.com',
    },
  ],
  Count: 2,
  ScannedCount: 2,
};

const mockCustomerResponse = {
  total: mockCustomerList.Count,
  items: mockCustomerList.Items.map((customer) => {
    return {
      name: customer.primary_key,
      email: customer.email,
    };
  }),
};

const mockCustomerItem = {
  Item: { email: 'tmg1@gmail.com', primary_key: 'tmg1' },
};

const mockGetCustomerByNameResponse = {
  customer: {
    Item: {
      email: 'tmg1@gmail.com',
      primary_key: 'tmg1',
    },
  },
};

module.exports = {
  mockCustomerList,
  mockCustomerResponse,
  mockCustomerItem,
  mockGetCustomerByNameResponse,
};
