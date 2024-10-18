// const { Router } = require("express");
// const { topicControllers } = require("../controllers");
// const { userControllers } = require("../controllers");

// const router = Router();

// router.post(
//   "/",
//   userControllers.protect,
//   userControllers.restrictTo("admin"),
//   topicControllers.createTopic
// );
// router.get("/", topicControllers.getAllTopics);
// router.get("/:id", topicControllers.getTopic);
// router.delete(
//   "/:id",
//   userControllers.protect,
//   userControllers.restrictTo("admin"),
//   topicControllers.deleteTopic
// );

// module.exports = router;
