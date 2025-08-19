const Thread = require("../models/Thread");
const Reply = require("../models/Reply");

const voteThread = async (req, res) => {
  const { threadId } = req.params;
  const { vote } = req.body;
  try {
    const thread = await Thread.findById(threadId);
    if (!thread) return res.status(404).json({ error: "Thread not found" });

    thread.votes += vote;
    await thread.save();

    res.json({ votes: thread.votes });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const voteReply = async (req, res) => {
  const { replyId } = req.params;
  const { vote } = req.body;
  try {
    const reply = await Reply.findById(replyId);
    if (!reply) return res.status(404).json({ error: "Reply not found" });

    reply.votes += vote;
    await reply.save();

    res.json({ votes: reply.votes });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  voteThread,
  voteReply,
};