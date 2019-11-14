const mongoose = require("mongoose");
const shortId = require("shortid");
const time = require("../libs/timeLib");
const response = require("./../libs/responseLib");
const logger = require("./../libs/loggerLib");
const check = require("../libs/checkLib");

const TodoModel = mongoose.model("Task");

//start create task function
let createTask = (req, res) => {
  TodoModel.findOne({ taskName: req.body.taskName })
    .select('-__v -_id')
    .lean()
    .exec((err, retrievedTaskDetails) => {
      if (err) {
        logger.error(err.message, "todoTaskController: createTask", 10);
        let apiResponse = response.generate(
          true,
          "Failed to create new task",
          500,
          null
        );
        res.send(apiResponse);
      } else if (check.isEmpty(retrievedTaskDetails)) {
        console.log(req.body);
        let newTask = new TodoModel({
          taskId: shortId.generate(),
          taskName: req.body.taskName,
          taskStatus: req.body.taskStatus,
          createdOn: time.now()
        });
        newTask.save((err, newTask) => {
          if (err) {
            console.log(err);
            logger.error(err.message, "todoTaskController: createTask", 10);
            let apiResponse = response.generate(
              true,
              "Failed to create new task",
              500,
              null
            );
            res.send(apiResponse);
          } else {
            let newTaskObj = newTask.toObject();
            let apiResponse = response.generate(false, "New task created successfully", 200, newTaskObj);
            res.send(apiResponse);
          }
        });
      } else {
        logger.error(
          "Task already present",
          "todoListController: createTask",
          4
        );
        let apiResponse = response.generate(
          true,
          "Task already present with this name",
          403,
          null
        );
        res.send(apiResponse);
      }
    });
}; //end of create task function

//start get all task function
let getAllTasks = (req, res) => {
  TodoModel.find()
    .select('-__v -_id')
    .lean()
    .exec((err, tasks) => {
      if (err) {
        console.log(err);
        logger.error(err.message, "todoTaskController: getAllTasks", 10);
        let apiResponse = response.generate(
          true,
          "Failed to find tasks",
          500,
          null
        );
        res.send(apiResponse);
      } else if (check.isEmpty(tasks)) {
        logger.info("No task found", "todoTaskController: getAllTasks");
        let apiResponse = response.generate(true, "No task found", 404, null);
        res.send(apiResponse);
      } else {
        let apiResponse = response.generate(
          false,
          "All tasks found",
          200,
          tasks
        );
        res.send(apiResponse);
      }
    });
}; // end of get all tasks

//start get task by id function
let getTaskById = (req, res) => {
  TodoModel.findOne({ taskId: req.params.taskId })
    .select('-__v -_id')
    .lean()
    .exec((err, task) => {
      if (err) {
        console.log(err);
        logger.error(err.message, "todoTaskController: getTaskById", 10);
        let apiResponse = response.generate(
          true,
          "Failed to find required task",
          500,
          null
        );
        res.send(apiResponse);
      } else if (check.isEmpty(task)) {
        logger.info("No task found", "todoTaskController: getTaskById");
        let apiResponse = response.generate(true, "No Task Found", 404, null);
        res.send(apiResponse);
      } else {
        let apiResponse = response.generate(
          false,
          "Required task was found",
          200,
          task
        );
        res.send(apiResponse);
      }
    });
}; // end get task by id function

//start edit task function
let editTask = (req, res) => {
  let options = req.body;
  TodoModel.findOne({ taskId: req.params.taskId }, options).exec(
    (err, updatedTask) => {
      if (err) {
        console.log(err);
        logger.error(err.message, "todoTaskController: editTask", 10);
        let apiResponse = response.generate(
          true,
          "Failed to edit task",
          500,
          null
        );
        res.send(apiResponse);
      } else if (check.isEmpty(updatedTask)) {
        logger.info("No task found", "todoTaskController: editTask");
        let apiResponse = response.generate(true, "No task found", 404, null);
        res.send(apiResponse);
      } else {
        let apiResponse = response.generate(
            false,
            "Task updated successfully",
            200,
            updatedTask
          );
          res.send(apiResponse);
      }
    }
  );
}// end of edit task function

//start delete task function
let deleteTask = (req, res) => {
    TodoModel.findOneAndRemove({ taskId: req.params.taskId }).exec(
        (err, result) => {
          if (err) {
            console.log(err);
            logger.error(err.message, "todoTaskController: deleteTask", 10);
            let apiResponse = response.generate(
              true,
              "Failed to delete task",
              500,
              null
            );
            res.send(apiResponse);
          } else if (check.isEmpty(result)) {
            logger.info("No task found", "todoTaskController: deleteTask");
            let apiResponse = response.generate(true, "No task found", 404, null);
            res.send(apiResponse);
          } else {
            let apiResponse = response.generate(
              false,
              "Task deleted successfully",
              200,
              result
            );
            res.send(apiResponse);
          }
        }
      ); // end user model find and remove
}

module.exports = {
  createTask: createTask,
  getAllTasks: getAllTasks,
  getTaskById: getTaskById,
  editTask: editTask,
  deleteTask: deleteTask
};
