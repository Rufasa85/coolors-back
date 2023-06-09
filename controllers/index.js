const express = require('express');
const router = express.Router();

const userRoutes = require("./userController");
router.use("/api/users",userRoutes)
const palletRoutes = require("./palletController");
router.use("/api/pallets",palletRoutes)

module.exports = router;