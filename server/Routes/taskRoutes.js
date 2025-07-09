const express = require('express')
const authMiddleware = require('./../middlewares/authMiddleware');
const taskControl = require('./../controllers/taskControllers');
const router = express.Router();
const roleMiddileware = require('./../middlewares/roleMiddleware');

router.route('/create-task')
       .post(authMiddleware, taskControl.createTask);
//router.post('/create', isAuthenticated, restrictTo('manager', 'owner'), taskController.createTask);

router.route('/get-task-byfarm/:farmId')
      .get(authMiddleware, taskControl.getTasksByFarm);

router.route('/get-my-tasks')
      .get(authMiddleware, taskControl.getMyTasks);

router.route('/update-task-status')
      .put(authMiddleware, taskControl.updateTaskStatus);

router.route('/delete-tasks')
      .delete(authMiddleware, taskControl.deleteTask)

module.exports = router;