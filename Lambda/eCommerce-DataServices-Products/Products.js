console.log('Loading function');

const doc = require('dynamodb-doc');

const dynamo = new doc.DynamoDB();

exports.handler = (event, context, callback) => {

    console.log('Received event:', JSON.stringify(event, null, 2));

    var dynamoREQ = {};

    dynamoREQ.TableName = process.env.ProductsTableName;


    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    switch (event.httpMethod) {

        case 'DELETE':

            dynamoREQ.Key = {};
            dynamoREQ.Key.product_id = event.pathParameters.product_id;

            dynamo.deleteItem(dynamoREQ, done);
            break;

        case 'GET':

            dynamoREQ.FilterExpression = "#product_id = :id";
            dynamoREQ.ExpressionAttributeValues = {":id": event.pathParameters.product_id};
            dynamoREQ.ExpressionAttributeNames = {"#product_id": "product_id"};

            console.log(JSON.stringify(dynamoREQ));

            dynamo.scan(dynamoREQ, done);
            break;

        case 'POST':
            dynamoREQ.Item = JSON.parse(event.body);
            dynamo.putItem(dynamoREQ, done);
            break;

        case 'PUT':
            done(new Error(`Unsupported method "${event.httpMethod}"`));
            /*
            dynamoREQ.Key = {};
            dynamoREQ.Key.product_id = event.product_id;
            dynamo.updateItem(dynamoREQ, done);
            */
            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));

    }
};
