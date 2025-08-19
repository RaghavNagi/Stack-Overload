const Tag = require("../models/Tag");
const Thread = require("../models/Thread");

const createTag = async (req, res) => {
  const { name, description } = req.body;
  try {
    const existingTag = await Tag.findOne({ name: name.toLowerCase() });
    if (existingTag) {
      return res.status(400).json({ error: "Tag already exists" });
    }

    const tag = new Tag({
      name: name.toLowerCase(),
      description,
      usageCount: 0,
    });
    await tag.save();
    res.status(201).json(tag);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const getTags = async (req, res) => {
  try {
    const { sort = "usage" } = req.query;
    let sortOption = {};

    switch (sort) {
      case "usage":
        sortOption = { usageCount: -1 };
        break;
      case "name":
        sortOption = { name: 1 };
        break;
      case "newest":
        sortOption = { createdAt: -1 };
        break;
      default:
        sortOption = { usageCount: -1 };
    }

    const tags = await Tag.find().sort(sortOption);
    res.json(tags);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const getPopularTags = async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const tags = await Tag.find()
      .sort({ usageCount: -1 })
      .limit(parseInt(limit));
    res.json(tags);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const getTagStats = async (req, res) => {
  try {
    const { tagName } = req.params;
    const tag = await Tag.findOne({ name: tagName.toLowerCase() });
    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }

    const threadsWithTag = await Thread.find({ tags: tagName.toLowerCase() });
    const totalVotes = threadsWithTag.reduce(
      (sum, thread) => sum + thread.votes,
      0
    );

    res.json({
      tag,
      threadCount: threadsWithTag.length,
      totalVotes,
      averageVotes:
        threadsWithTag.length > 0 ? totalVotes / threadsWithTag.length : 0,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createTag,
  getTags,
  getPopularTags,
  getTagStats,
};
