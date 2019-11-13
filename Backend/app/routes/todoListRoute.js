const express = require("express");
const router = express.Router();
const appConfig = require("./../../config/appConfig");
const auth = require("./../middlewares/auth");
const todoListController = require("../controllers/todoListController");

module.exports.setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}/todo/list`;

    app.post(`${baseUrl}/create`, auth.isAuthorized, todoListController.createList);

    app.get(`${baseUrl}/view/all`, auth.isAuthorized, todoListController.getAllLists);

    app.get(`${baseUrl}/:listId/view/details`, auth.isAuthorized, todoListController.getListById);

    app.put(`${baseUrl}/:listId/edit`, auth.isAuthorized, todoListController.editList);

    app.post(`${baseUrl}/:listId/delete`, auth.isAuthorized, todoListController.deleteList);
}
