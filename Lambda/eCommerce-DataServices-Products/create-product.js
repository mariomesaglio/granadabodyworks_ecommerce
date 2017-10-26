console.log('Loading function');

const doc = require('dynamodb-doc');
const dynamo = new doc.DynamoDB();

exports.handler = (event, context, callback) => {

    console.log('Received event:', JSON.stringify(event, null, 2));

    var dynamoREQ = {};

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    dynamoREQ.TableName = process.env.ProductsTableName;
    dynamoREQ.Item = JSON.parse(event.body);
    dynamo.putItem(dynamoREQ, done);
};
