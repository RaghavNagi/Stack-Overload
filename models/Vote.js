const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  thread: { type: mongoose.Schema.Types.ObjectId, ref: "Thread" },
  reply: { type: mongoose.Schema.Types.ObjectId, ref: "Reply" },
  value: { type: Number, enum: [1, -1], required: true }, // upvote/downvote
});

module.exports = mongoose.model("Vote", voteSchema);
