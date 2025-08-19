const Reply = require("../models/Reply");

const addReply = async (req, res, next) => {
  try {
    const { thread, parent, body } = req.body;
    const reply = await Reply.create({
      thread,
      parent: parent || null,
      body,
      author: req.user._id,
    });
    res.status(201).json(reply);
  } catch (err) {
    next(err);
  }
};

const getReplies = async (req, res, next) => {
  try {
    const { threadId } = req.params;
    const replies = await Reply.find({ thread: threadId }).populate(
      "author",
      "username"
    );
    res.json(replies);
  } catch (err) {
    next(err);
  }
};

const voteReply = async (req, res, next) => {
  try {
    const { vote } = req.body; // vote: 1 or -1
    const reply = await Reply.findById(req.params.id);
    if (!reply) return res.status(404).json({ message: "Reply not found" });

    reply.votes += vote;
    await reply.save();
    res.json({ votes: reply.votes });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addReply,
  getReplies,
  voteReply,
};
