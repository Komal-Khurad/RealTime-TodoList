const express = require("express");
const router = express.Router();
const appConfig = require("./../../config/appConfig");
const auth = require("./../middlewares/auth");
const todoTaskController = require("../controllers/todoTaskController");

module.exports.setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}/todo/list/task`;

    app.post(`${baseUrl}/create`, auth.isAuthorized, todoTaskController.createTask);

    app.get(`${baseUrl}/view/all`, auth.isAuthorized, todoTaskController.getAllTasks);

    app.get(`${baseUrl}/:taskId/view/details`, auth.isAuthorized, todoTaskController.getTaskById);

    app.put(`${baseUrl}/:taskId/edit`, auth.isAuthorized, todoTaskController.editTask);

    app.post(`${baseUrl}/:taskId/delete`, auth.isAuthorized, todoTaskController.deleteTask);
}
