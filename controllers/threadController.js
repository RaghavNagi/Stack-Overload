const Thread = require("../models/Thread");

exports.createThread = async (req, res, next) => {
  try {
    const { title, body, tags, category } = req.body;
    const thread = await Thread.create({
      title,
      body,
      tags,
      category,
      author: req.user._id,
    });
    res.status(201).json(thread);
  } catch (err) {
    next(err);
  }
};

exports.getThreads = async (req, res, next) => {
  try {
    const { search, tag, category } = req.query;
    let query = {};
    if (search) query.title = { $regex: search, $options: "i" };
    if (tag) query.tags = tag;
    if (category) query.category = category;

    const threads = await Thread.find(query).populate("author", "username");
    res.json(threads);
  } catch (err) {
    next(err);
  }
};

exports.getThread = async (req, res, next) => {
  try {
    const thread = await Thread.findById(req.params.id).populate(
      "author",
      "username"
    );
    if (!thread) return res.status(404).json({ message: "Thread not found" });
    res.json(thread);
  } catch (err) {
    next(err);
  }
};

exports.voteThread = async (req, res, next) => {
  try {
    const { vote } = req.body; // vote: 1 or -1
    const thread = await Thread.findById(req.params.id);
    if (!thread) return res.status(404).json({ message: "Thread not found" });

    thread.votes += vote;
    await thread.save();
    res.json({ votes: thread.votes });
  } catch (err) {
    next(err);
  }
};
