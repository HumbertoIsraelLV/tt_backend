const express = require("express");
const router = express.Router();
const EURUSDModel = require("../Models/Week");

router.get("/", async (req, res) => {
  try {
    const EURUSD = await EURUSDModel.find();
    res.json(EURUSD);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  console.log("Week: " + req.body.keyName);
  const Week = new EURUSDModel({
    _id: req.body._id,
    High: req.body.High,
    Low: req.body.Low,
    Close: req.body.Close,
    Open: req.body.Open,
  });
  try {
    const newWeek = await Week.save();
    res.status(201).json(newWeek);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
