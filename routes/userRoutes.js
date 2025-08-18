const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get(
  "/profile",
  (req, res, next) => {
    console.log("Profile route hit");
    next();
  },
  protect,
  userController.getProfile
);

module.exports = router;
