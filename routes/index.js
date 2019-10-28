const { Router } = require("express");

const bugRoutes = require("./bug");
const userRoutes = require("./user");

const router = Router();

router.use("/bugs", bugRoutes);
router.use("/users", userRoutes);

module.exports = router;
