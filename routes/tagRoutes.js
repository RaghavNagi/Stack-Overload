const express = require("express");
const { createTag, getTags } = require("../controllers/tagController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, createTag);
router.get("/", getTags);

module.exports = router;
