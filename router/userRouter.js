const { Router } = require("express");
const { check } = require("express-validator");
const { userControllers } = require("../controllers");
const authMiddlewares = require("../middlewares/userMiddlewares");
const roleMiddlewares = require("../middlewares/roleMiddlewares");

const router = Router();

router.post(
  "/registration",
  [
    check("name", "name cannot cannot be empty").notEmpty(),
    check("email", "email cannot cannot be empty").notEmpty(),
    check(
      "password",
      "password cannot be less than 8 characters and more than 15"
    ).isLength({ min: 8, max: 15 }),
  ],
  userControllers.registration
);

router.post("/login", userControllers.login);

router.get("/users", roleMiddlewares("admin"), userControllers.getUsers);

router.get("/:id", userControllers.getUser);

router.patch(
  "/:id",
  [
    check("name", "Name cannot be empty").optional().notEmpty(),
    check("email", "Email cannot be empty").optional().notEmpty(),
    check("email", "Invalid email format").optional().isEmail(),
    check("password", "Password must be between 8 and 15 characters")
      .optional()
      .isLength({ min: 8, max: 15 }),
  ],
  userControllers.patchUser
);

router.delete("/:id", userControllers.deleteUser);

module.exports = router;
