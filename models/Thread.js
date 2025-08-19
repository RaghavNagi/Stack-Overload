const mongoose = require("mongoose");

const threadSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body:  { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tags:   [{ type: String }],
  category: { type: String },
  votes:  { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Thread", threadSchema);