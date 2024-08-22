const mongoose = require("mongoose");

const rewardHistorySchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  points: {
    type: Number,
    required: true,
  },
  givenBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  givenTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("RewardHistory", rewardHistorySchema);
