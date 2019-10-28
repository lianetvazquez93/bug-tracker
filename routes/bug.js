const { Router } = require("express");

const bugController = require("../controllers/bug");
const { isAuthenticated } = require("../middleware");

const router = Router();

router.get("/", bugController.getAll);

router.post("/", isAuthenticated, bugController.reportNewBug);

router.put("/:id", isAuthenticated, bugController.update);

router.delete("/:id", isAuthenticated, bugController.remove);

module.exports = router;
