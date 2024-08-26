const serverless = require('serverless-http');
const express = require('express');
const todoRoutes = require('./todo/todo.routes');

const app = express();
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_, res) => {
  return res.status(200).json({
    message: 'This is the response from AWS lambda',
  });
});

app.use('/api/v1/tasks', todoRoutes);

app.use((_, res) => {
  return res.status(404).json({
    error: 'Not Found',
  });
});

exports.handler = serverless(app);
app.listen(3000, () => {
  console.log('app running');
});
