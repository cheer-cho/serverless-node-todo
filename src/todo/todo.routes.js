const express = require('express');
const todoControllers = require('./todo.controllers');

const router = express.Router();

router.route('/').get(todoControllers.getAllTasks).post(todoControllers.addTask);
router
  .route('/:id')
  .get(todoControllers.getTaskById)
  .patch(todoControllers.updateTask)
  .delete(todoControllers.deleteTask);

module.exports = router;
