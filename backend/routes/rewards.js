const express = require("express");
const RewardHistory = require("../models/rewardHistory");

const router = express.Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const history = await RewardHistory.find({ givenTo: id }).populate("givenBy");
  res.status(200).send(history);
});

module.exports = router;
