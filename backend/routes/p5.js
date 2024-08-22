const express = require("express");
const User = require("../models/user");
const RewardHistory = require("../models/rewardHistory");
const mongoose = require("mongoose");

const router = express.Router();

router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const { points, givenTo } = req.body;

  const user = await User.findById(new mongoose.Types.ObjectId(id));
  const receiver = await User.findOne({ name: givenTo });

  if (user.p5Balance >= points) {
    user.p5Balance -= points;
    receiver.rewardsBalance += points;

    const rewardHistory = new RewardHistory({
      points,
      givenBy: user._id,
      givenTo: receiver._id,
    });

    await rewardHistory.save();
    await user.save();
    await receiver.save();

    res.status(201).send(rewardHistory);
  } else {
    res.status(400).send({ message: "Not enough P5 balance" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const history = await RewardHistory.find({ givenBy: id }).populate("givenTo");
  res.status(200).send(history);
});

router.delete("/:id/:p5Id", async (req, res) => {
  const { id, p5Id } = req.params;

  const history = await RewardHistory.findById(p5Id);
  const user = await User.findById(id);
  const receiver = await User.findById(history.givenTo);

  user.p5Balance += history.points;
  receiver.rewardsBalance -= history.points;

  await history.remove();
  await user.save();
  await receiver.save();

  res.status(200).send({ message: "P5 transaction reversed" });
});

module.exports = router;
