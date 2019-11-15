const mongoose = require("mongoose");
const shortid = require("shortid");
const time = require("./../libs/timeLib");
const passwordLib = require("../libs/passwordLib");
const response = require("./../libs/responseLib");
const logger = require("./../libs/loggerLib");
const validateInput = require("../libs/paramsValidationLib");
const check = require("../libs/checkLib");
const token = require("../libs/tokenLib");

/* Models */
const UserModel = mongoose.model("User");
const AuthModel = mongoose.model("Auth");

// start getAllUser function
let getAllUser = (req, res) => {
  UserModel.find()
    .select("-__v -_id")
    .lean()
    .exec((err, result) => {
      if (err) {
        console.log(err);
        logger.error(err.message, "User Controller: getAllUser", 10);
        let apiResponse = response.generate(
          true,
          "Failed to find user details",
          500,
          null
        );
        res.send(apiResponse);
      } else if (check.isEmpty(result)) {
        logger.info("No user found", "User Controller: getAllUser");
        let apiResponse = response.generate(true, "No user found", 404, null);
        res.send(apiResponse);
      } else {
        let apiResponse = response.generate(
          false,
          "All user details found",
          200,
          result
        );
        res.send(apiResponse);
      }
    });
}; //end of getAllUser

/* Get single user details */
let getSingleUser = (req, res) => {
  UserModel.findOne({ userId: req.params.userId })
    .select("-password -__v -_id")
    .lean()
    .exec((err, result) => {
      if (err) {
        console.log(err);
        logger.error(err.message, "User Controller: getSingleUser", 10);
        let apiResponse = response.generate(
          true,
          "Failed to find user details",
          500,
          null
        );
        res.send(apiResponse);
      } else if (check.isEmpty(result)) {
        logger.info("No user found", "User Controller:getSingleUser");
        let apiResponse = response.generate(true, "No user found", 404, null);
        res.send(apiResponse);
      } else {
        let apiResponse = response.generate(
          false,
          "User details found",
          200,
          result
        );
        res.send(apiResponse);
      }
    });
}; // end get single user

let deleteUser = (req, res) => {
  UserModel.findOneAndRemove({ userId: req.params.userId }).exec(
    (err, result) => {
      if (err) {
        console.log(err);
        logger.error(err.message, "User Controller: deleteUser", 10);
        let apiResponse = response.generate(
          true,
          "Failed to delete user",
          500,
          null
        );
        res.send(apiResponse);
      } else if (check.isEmpty(result)) {
        logger.info("No user found", "User Controller: deleteUser");
        let apiResponse = response.generate(true, "No user found", 404, null);
        res.send(apiResponse);
      } else {
        let apiResponse = response.generate(
          false,
          "Deleted the user successfully",
          200,
          result
        );
        res.send(apiResponse);
      }
    }
  ); // end user model find and remove
}; // end delete user

let editUser = (req, res) => {
  let options = req.body;
  UserModel.update({ userId: req.params.userId }, options).exec(
    (err, result) => {
      if (err) {
        console.log(err);
        logger.error(err.message, "User Controller:editUser", 10);
        let apiResponse = response.generate(
          true,
          "Failed to edit user details",
          500,
          null
        );
        res.send(apiResponse);
      } else if (check.isEmpty(result)) {
        logger.info("No user found", "User Controller: editUser");
        let apiResponse = response.generate(true, "No user found", 404, null);
        res.send(apiResponse);
      } else {
        let apiResponse = response.generate(
          false,
          "User details edited successfully",
          200,
          result
        );
        res.send(apiResponse);
      }
    }
  ); // end user model update
}; // end edit user

//Start user sign up function
let signUpFunction = (req, res) => {
  let validateUserInput = () => {
    return new Promise((resolve, reject) => {
      if (req.body.email) {
        if (!validateInput.Email(req.body.email)) {
          let apiResponse = response.generate(
            true,
            "Email does not met the requirement",
            400,
            null
          );
          reject(apiResponse);
        } else if (check.isEmpty(req.body.password)) {
          let apiResponse = response.generate(
            true,
            '"password" parameter is missing',
            400,
            null
          );
          reject(apiResponse);
        } else {
          resolve(req);
        }
      } else {
        logger.error(
          "Field missing during user creation",
          "userController: createUser()",
          5
        );
        let apiResponse = response.generate(
          true,
          "One or more parameter(s) is missing",
          400,
          null
        );
        reject(apiResponse);
      }
    });
  }; //end validate user input

  let createUser = () => {
    return new Promise((resolve, reject) => {
      UserModel.findOne({ email: req.body.email })
        .select(" -__v -_id")
        .lean()
        .exec((err, retrievedUserDetails) => {
          if (err) {
            logger.error(err.message, "userController: createUser", 10);
            let apiResponse = response.generate(
              true,
              "Failed to create user",
              500,
              null
            );
            reject(apiResponse);
          } else if (check.isEmpty(retrievedUserDetails)) {
            console.log(req.body);
            let newUser = new UserModel({
              userId: shortid.generate(),
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email.toLowerCase(),
              mobileNumber: req.body.mobileNumber,
              password: passwordLib.hashpassword(req.body.password),
              createdOn: time.now()
            });
            newUser.save((err, newUser) => {
              if (err) {
                console.log(err);
                logger.error(err.message, "userController: createUser", 10);
                let apiResponse = response.generate(
                  true,
                  "Failed to create new User",
                  500,
                  null
                );
                reject(apiResponse);
              } else {
                let newUserObj = newUser.toObject();
                resolve(newUserObj);
              }
            });
          } else {
            logger.error(
              "User already present",
              "userController: createUser",
              4
            );
            let apiResponse = response.generate(
              true,
              "User already present with this email",
              403,
              null
            );
            reject(apiResponse);
          }
        });
    });
  }; // end of create user function

  validateUserInput(req, res)
    .then(createUser)
    .then(resolve => {
      delete resolve.password;
      let apiResponse = response.generate(false, "User created", 200, resolve);
      res.send(apiResponse);
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
}; //end user sign up function

let loginFunction = (req, res) => {
  let findUser = () => {
    console.log("finding user");
    return new Promise((resolve, reject) => {
      if (req.body.email) {
        console.log("req body email is there");
        console.log(req.body);
        UserModel.findOne({ email: req.body.email }, (err, userDetails) => {
          /* handle the error here if the User is not found */
          if (err) {
            console.log(err);
            logger.error(
              "Failed to retrieve user data",
              "userController: findUser",
              10
            );
            /* generate the error message and the api response message here */
            let apiResponse = response.generate(
              true,
              "Failed to find user details",
              500,
              null
            );
            reject(apiResponse);
          } else if (check.isEmpty(userDetails)) {
            /* generate the response and the console error message here */
            logger.error("No user found", "userController: findUser", 7);
            let apiResponse = response.generate(
              true,
              "No user details found",
              404,
              null
            );
            reject(apiResponse);
          } else {
            /* prepare the message and the api response here */
            logger.info("User found", "userController: findUser", 10);
            resolve(userDetails);
          }
        });
      } else {
        let apiResponse = response.generate(
          true,
          '"email" parameter is missing',
          400,
          null
        );
        reject(apiResponse);
      }
    });
  };

  let validatePassword = retrievedUserDetails => {
    console.log("validatePassword");
    return new Promise((resolve, reject) => {
      passwordLib.comparePassword(
        req.body.password,
        retrievedUserDetails.password,
        (err, isMatch) => {
          if (err) {
            console.log(err);
            logger.error(err.message, "userController: validatePassword", 10);
            let apiResponse = response.generate(
              true,
              "Login failed",
              500,
              null
            );
            reject(apiResponse);
          } else if (isMatch) {
            let retrievedUserDetailsObj = retrievedUserDetails.toObject();
            delete retrievedUserDetailsObj.password;
            delete retrievedUserDetailsObj._id;
            delete retrievedUserDetailsObj.__v;
            delete retrievedUserDetailsObj.createdOn;
            delete retrievedUserDetailsObj.modifiedOn;
            resolve(retrievedUserDetailsObj);
          } else {
            logger.info(
              "Login failed due to invalid password",
              "userController: validatePassword",
              10
            );
            let apiResponse = response.generate(
              true,
              "Wrong password.Login failed",
              400,
              null
            );
            reject(apiResponse);
          }
        }
      );
    });
  };

  let generateToken = userDetails => {
    console.log("generate token");
    return new Promise((resolve, reject) => {
      token.generateToken(userDetails, (err, tokenDetails) => {
        if (err) {
          console.log(err);
          let apiResponse = response.generate(
            true,
            "Failed to generate token",
            500,
            null
          );
          reject(apiResponse);
        } else {
          tokenDetails.userId = userDetails.userId;
          tokenDetails.userDetails = userDetails;
          resolve(tokenDetails);
        }
      });
    });
  };

  let saveToken = tokenDetails => {
    console.log("save token");
    return new Promise((resolve, reject) => {
      AuthModel.findOne(
        { userId: tokenDetails.userId },
        (err, retrievedTokenDetails) => {
          if (err) {
            console.log(err.message, "userController: saveToken", 10);
            let apiResponse = response.generate(
              true,
              "Failed to generate token",
              500,
              null
            );
            reject(apiResponse);
          } else if (check.isEmpty(retrievedTokenDetails)) {
            let newAuthToken = new AuthModel({
              userId: tokenDetails.userId,
              authToken: tokenDetails.token,
              tokenSecret: tokenDetails.tokenSecret,
              tokenGenerationTime: time.now()
            });
            newAuthToken.save((err, newTokenDetails) => {
              if (err) {
                console.log(err);
                logger.error(err.message, "userController: saveToken", 10);
                let apiResponse = response.generate(
                  true,
                  "Failed to generate token",
                  500,
                  null
                );
                reject(apiResponse);
              } else {
                let responseBody = {
                  authToken: newTokenDetails.authToken,
                  userDetails: tokenDetails.userDetails
                };
                resolve(responseBody);
              }
            });
          } else {
            retrievedTokenDetails.authToken = tokenDetails.token;
            retrievedTokenDetails.tokenSecret = tokenDetails.tokenSecret;
            retrievedTokenDetails.tokenGenerationTime = time.now();
            retrievedTokenDetails.save((err, newTokenDetails) => {
              if (err) {
                console.log(err);
                logger.error(err.message, "userController: saveToken", 10);
                let apiResponse = response.generate(
                  true,
                  "Failed to generate token",
                  500,
                  null
                );
                reject(apiResponse);
              } else {
                let responseBody = {
                  authToken: newTokenDetails.authToken,
                  userDetails: tokenDetails.userDetails
                };
                resolve(responseBody);
              }
            });
          }
        }
      );
    });
  }; //end of save token

  findUser(req, res)
    .then(validatePassword)
    .then(generateToken)
    .then(saveToken)
    .then(resolve => {
      let apiResponse = response.generate(
        false,
        "Login successful",
        200,
        resolve
      );
      res.status(200).send(apiResponse);
    })
    .catch(err => {
      console.log("errorhandler");
      console.log(err);
      res.status(err.status).send(err);
    });
}; //end of login function

//start logout function

let logout = (req, res) => {
  AuthModel.findOneAndRemove({ userId: req.user.userId }, (err, result) => {
    if (err) {
      console.log(err);
      logger.error(err.message, "user Controller: logout", 10);
      let apiResponse = response.generate(
        true,
        `error occurred: ${err.message}`,
        500,
        null
      );
      res.send(apiResponse);
    } else if (check.isEmpty(result)) {
      let apiResponse = response.generate(
        true,
        "Already logged out or invalid userId",
        404,
        null
      );
      res.send(apiResponse);
    } else {
      let apiResponse = response.generate(
        false,
        "Logged out successfully",
        200,
        null
      );
      res.send(apiResponse);
    }
  });
}; //end of logout function

//start of friend search function
let search = (req, res) => {
  UserModel.find({ userName: req.user.username }, (err, result) => {
    if (err) {
      console.log(err);
      logger.error(err.message, "user Controller: search", 10);
      let apiResponse = response.generate(
        true,
        `error occurred: ${err.message}`,
        500,
        null
      );
      res.send(apiResponse);
    } else if (check.isEmpty(result)) {
      let apiResponse = response.generate(
        true,
        "Could not search user",
        404,
        null
      );
      res.send(apiResponse);
    } else {
      let apiResponse = response.generate(
        false,
        "Search result found",
        200,
        null
      );
      res.send(apiResponse);
    }
  });
};

let searchFriend = (req, res) => {
  var searchfriend = req.body.searchfriend;
  if (searchfriend) {
    var mssg = '';
    if (searchfriend == req.user.username) {
      searchfriend = null;
    }
    UserModel.find({ username: searchfriend }, (err, result) => {
      if (err) {
        console.log(err);
        logger.error(err.message, "user Controller: searchFriend", 10);
        let apiResponse = response.generate(
          true,
          `error occurred: ${err.message}`,
          500,
          null
        );
        res.send(apiResponse);
      } else if (check.isEmpty(result)) {
        let apiResponse = response.generate(
          true,
          "Could not search friend",
          404,
          null
        );
        res.send(apiResponse);
      } else {
        let apiResponse = response.generate(
          false,
          "Search result found",
          200,
          null
        );
        res.send(apiResponse);
      }
    });
  } 
}

module.exports = {
  signUpFunction: signUpFunction,
  loginFunction: loginFunction,
  getAllUser: getAllUser,
  getSingleUser: getSingleUser,
  editUser: editUser,
  deleteUser: deleteUser,
  logout: logout,
  search: search,
  searchFriend: searchFriend
}; // end exports
