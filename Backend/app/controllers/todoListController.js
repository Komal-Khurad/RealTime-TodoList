const mongoose = require("mongoose");
const shortId = require("shortid");
const time = require("../libs/timeLib");
const response = require("./../libs/responseLib");
const logger = require("./../libs/loggerLib");
const check = require("../libs/checkLib");

const TodoModel = mongoose.model("List");

//start create list function
let createList = (req, res) => {
  TodoModel.findOne({ listName: req.body.listName })
    .select("-__v -_id")
    .lean()
    .exec((err, retrievedListDetails) => {
      if (err) {
        logger.error(err.message, "todoListController: createList", 10);
        let apiResponse = response.generate(
          true,
          "Failed to create new list",
          500,
          null
        );
        res.send(apiResponse);
      } else if (check.isEmpty(retrievedListDetails)) {
        console.log(req.body);
        let newList = new TodoModel({
          listId: shortId.generate(),
          listName: req.body.listName,
          createdOn: time.now()
        });
        newList.save((err, newList) => {
          if (err) {
            console.log(err);
            logger.error(err.message, "todoListController: createList", 10);
            let apiResponse = response.generate(
              true,
              "Failed to create new list",
              500,
              null
            );
            res.send(apiResponse);
          } else {
            let newListObj = newList.toObject();
            let apiResponse = response.generate(false, "New list created successfully", 200, newListObj);
            res.send(apiResponse);
          }
        });
      } else {
        logger.error(
          "List already present with this name",
          "todoListController: createList",
          4
        );
        let apiResponse = response.generate(
          true,
          "List already present with this name",
          403,
          null
        );
        res.send(apiResponse);
      }
    });
}; //end of create list function

//start get all list function
let getAllLists = (req, res) => {
  TodoModel.find()
    .select("-__v -_id")
    .lean()
    .exec((err, listData) => {
      if (err) {
        console.log(err);
        logger.error(err.message, "todoListController: getAllLists", 10);
        let apiResponse = response.generate(
          true,
          "Failed to find lists",
          500,
          null
        );
        res.send(apiResponse);
      } else if (check.isEmpty(listData)) {
        logger.info("No list was found", "todoListController: getAllLists");
        let apiResponse = response.generate(true, "No list was found", 404, null);
        res.send(apiResponse);
      } else {
        let apiResponse = response.generate(
          false,
          "All lists found",
          200,
          listData
        );
        res.send(apiResponse);
      }
    });
}; // end of get all lists

//start get list by id function
let getListById = (req, res) => {
  TodoModel.findOne({ listId: req.params.listId })
    .select("-__v -_id")
    .lean()
    .exec((err, listData) => {
      if (err) {
        console.log(err);
        logger.error(err.message, "todoListController: getListById", 10);
        let apiResponse = response.generate(
          true,
          "Failed to find required list",
          500,
          null
        );
        res.send(apiResponse);
      } else if (check.isEmpty(listData)) {
        logger.info("No list was found", "todoListController: getListById");
        let apiResponse = response.generate(true, "No list was found", 404, null);
        res.send(apiResponse);
      } else {
        let apiResponse = response.generate(
          false,
          "Required list was found",
          200,
          listData
        );
        res.send(apiResponse);
      }
    });
}; // end get list by id function

//start edit list function
let editList = (req, res) => {
  let options = req.body;
  TodoModel.findOne({ listId: req.params.listId }, options).exec(
    (err, updatedList) => {
      if (err) {
        console.log(err);
        logger.error(err.message, "todoListController: editList", 10);
        let apiResponse = response.generate(
          true,
          "Failed to edit list",
          500,
          null
        );
        res.send(apiResponse);
      } else if (check.isEmpty(updatedList)) {
        logger.info("No list was found", "todoListController: editList");
        let apiResponse = response.generate(true, "No list was found", 404, null);
        res.send(apiResponse);
      } else {
        let apiResponse = response.generate(
            false,
            "List updated successfully",
            200,
            updatedList
          );
          res.send(apiResponse);
      }
    }
  );
}// end of edit list function

//start delete list function
let deleteList = (req, res) => {
    TodoModel.findOneAndRemove({ listId: req.params.listId }).exec(
        (err, result) => {
          if (err) {
            console.log(err);
            logger.error(err.message, "todoListController: deleteList", 10);
            let apiResponse = response.generate(
              true,
              "Failed to delete list",
              500,
              null
            );
            res.send(apiResponse);
          } else if (check.isEmpty(result)) {
            logger.info("No List Found", "todoListController: deleteList");
            let apiResponse = response.generate(true, "No List Found", 404, null);
            res.send(apiResponse);
          } else {
            let apiResponse = response.generate(
              false,
              "List deleted successfully",
              200,
              result
            );
            res.send(apiResponse);
          }
        }
      ); // end user model find and remove
}

module.exports = {
  createList: createList,
  getAllLists: getAllLists,
  getListById: getListById,
  editList: editList,
  deleteList: deleteList
};
