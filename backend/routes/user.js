const express = require("express");
const User = require("../models/user");
const mongoose = require("mongoose");

const router = express.Router();

router.post("/", async (req, res) => {
  const { name } = req.body;
  const user = new User({ name });
  await user.save();
  res.status(201).send(user);
});

router.get("/", async (req, res) => {
  const users = await User.find();
  res.status(200).send(users);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.find(new mongoose.Types.ObjectId(id));
  res.status(200).send(user);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = await User.findByIdAndUpdate(id, { name }, { new: true });
  res.status(200).send(user);
});

module.exports = router;
