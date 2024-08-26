const { v7 } = require('uuid');
const {
  DynamoDBClient,
  PutItemCommand,
  UpdateItemCommand,
  GetItemCommand,
  DeleteItemCommand,
} = require('@aws-sdk/client-dynamodb');

const REGION = 'us-east-2';

const getDynamoClient = () => new DynamoDBClient({ region: REGION });

// exports.getAllTasks = async (_, res, next) => {
//   try {
//     const client = getDynamoClient();
//     const input = {
//       TableName: 'TodoTable',
//       Key: {},
//     };
//     const command = new GetItemCommand(input);
//     const response = await client.send(command);
//     return res.status(200).json({
//       status: 'success',
//       data: response,
//     });
//   } catch (e) {
//     console.log(e);
//     next(e);
//   }
// };

exports.getTaskById = (req, res, next) => {
  next();
};

exports.addTask = async (req, res) => {
  try {
    const { todo } = req.body;
    const id = v7();
    const createdAt = new Date();

    const client = getDynamoClient();
    const input = {
      TableName: 'TodoTable',
      Item: {
        id: {
          S: id,
        },
        todo: {
          S: todo,
        },
        createdAt: {
          S: createdAt,
        },
        complete: {
          BOOL: false,
        },
      },
    };
    const command = new PutItemCommand(input);
    const result = await client.send(command);

    return res.status(201).json({
      status: 'success',
      data: result,
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

exports.updateTask = (req, res) => {};

exports.deleteTask = (req, res) => {};
