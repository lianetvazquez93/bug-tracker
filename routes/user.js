const { Router } = require("express");

const userController = require("../controllers/user");
const authController = require("../controllers/auth");
const { isAuthenticated } = require("../middleware");

const router = Router();

router.post("/login", authController.login);

router.get("/profile", isAuthenticated, userController.profile);

router.post("/", userController.register);

router.put("/:id", isAuthenticated, userController.update);

router.delete("/:id", isAuthenticated, userController.remove);

module.exports = router;
