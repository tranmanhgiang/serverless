// module.exports = {
//   tables: [
//     {
//       TableName: `serverless-demo-customerTable-dev`,
//       KeySchema: [{ AttributeName: 'primary_key', KeyType: 'HASH' }],
//       AttributeDefinitions: [
//         { AttributeName: 'primary_key', AttributeType: 'S' },
//       ],
//       ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
//     },
//   ],
// };
const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });
module.exports = { dynamodb: new AWS.DynamoDB.DocumentClient() };
