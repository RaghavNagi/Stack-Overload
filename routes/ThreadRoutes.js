const express = require("express");
const router = express.Router();
const threadController = require("../controllers/threadController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/", protect, threadController.createThread);
router.get("/", threadController.getThreads);
router.get("/:id", threadController.getThread);
router.post("/:id/vote", protect, threadController.voteThread);

module.exports = router;

