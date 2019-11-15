const express = require("express");
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const appConfig = require("./../../config/appConfig");
const auth = require("./../middlewares/auth");

module.exports.setRouter = app => {
  let baseUrl = `${appConfig.apiVersion}/users`;

  app.get(`${baseUrl}/view/all`, auth.isAuthorized, userController.getAllUser);

  // params: userId.
  app.get(
    `${baseUrl}/:userId/details`,
    auth.isAuthorized,
    userController.getSingleUser
  );

  app.post(`${baseUrl}/signup`, userController.signUpFunction);
  /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/signup api for user signup.
     *
     * @apiParam {string} firstName First Name of the user. (body params) (required)
     * @apiParam {string} lastName Last Name of the user. (body params) (required)
     * @apiParam {string} mobileNumber Mobile Number of the user. (body params) (required)
     * @apiParam {string} email Email of the user. (body params) (required)
     * @apiParam {string} password Password of the user. (body params) (required)
     * 
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Account Successfully Created",
            "status": 200,
            "data": {
                "authToken": "eyJhbGciOiJIUertyuiopojhgfdwertyuVCJ9.MCwiZXhwIjoxNTIwNDI29tIiwibGFzdE5hbWUiE4In19.hAR744xIY9K53JWm1rQ2mc",
                "userDetails": {
                "mobileNumber": 2234435524,
                "email": "someone@mail.com",
                "lastName": "Sengar",
                "firstName": "Rishabh",
                "userId": "-E9zxTYA8"
            }

        }
     * @apiErrorExample {json} Error-Response:
         {
	         "error": true,
	         "message": "Error Occured.,
	         "status": 500,
	         "data": null
	     }
    */

  app.post(`${baseUrl}/login`, userController.loginFunction);
  /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/login api for user login.
     *
     * @apiParam {string} email Email of the user. (body params) (required)
     * @apiParam {string} password Password of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Login Successful",
            "status": 200,
            "data": {
                "authToken": "eyJhbGciOiJIUertyuiopojhgfdwertyuVCJ9.MCwiZXhwIjoxNTIwNDI29tIiwibGFzdE5hbWUiE4In19.hAR744xIY9K53JWm1rQ2mc",
                "userDetails": {
                "mobileNumber": 2234435524,
                "email": "someone@mail.com",
                "lastName": "Sengar",
                "firstName": "Rishabh",
                "userId": "-E9zxTYA8"
                }
            }
        }
     * @apiErrorExample {json} Error-Response:
         {
	        "error": true,
	        "message": "Error Occured.,
	        "status": 500,
	        "data": null
	     }
    */

  app.post(`${baseUrl}/logout`, auth.isAuthorized, userController.logout);

  app.get(`${baseUrl}/search`, auth.isAuthorized, userController.search);

  app.post(`${baseUrl}/search`, auth.isAuthorized, userController.searchFriend);
};
