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
    dynamoREQ.FilterExpression = "#product_id = :id";
    dynamoREQ.ExpressionAttributeValues = {":id": event.pathParameters.product_id};
    dynamoREQ.ExpressionAttributeNames = {"#product_id": "product_id"};

    console.log(JSON.stringify(dynamoREQ));

    dynamo.scan(dynamoREQ, done);

};
