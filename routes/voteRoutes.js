const express = require("express");
const { voteThread, voteReply } = require("../controllers/voteController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/thread/:threadId", protect, voteThread);
router.post("/reply/:replyId", protect, voteReply);

module.exports = router;
