const express = require("express");
const router = express.Router();
const replyController = require("../controllers/replyController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/", protect, replyController.addReply);
router.get("/:threadId", replyController.getReplies);
router.post("/:id/vote", protect, replyController.voteReply);

module.exports = router;
