const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoutes = require("./routes/user");
const p5Routes = require("./routes/p5");
const rewardRoutes = require("./routes/rewards");

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/mini-peerfives")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/users", userRoutes);
app.use("/p5", p5Routes);
app.use("/rewards", rewardRoutes);

module.exports = app;
