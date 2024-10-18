const userControllers = require("./userControllers");
const registration = require("./userControllers");
const login = require("./userControllers");
const getUsers = require("./userControllers");
const getUser = require("./userControllers");
const patchUser = require("./userControllers");
const deleteUser = require("./userControllers");
const topicControllers = require("./topicControllers");
const postControllers = require("./postControllers");

module.exports = {
  userControllers,
  registration,
  login,
  getUsers,
  getUser,
  patchUser,
  topicControllers,
  postControllers,
};
