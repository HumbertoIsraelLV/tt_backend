const {Schema, model} = require("mongoose");

const EURUSDWeek = new Schema(
  {
    _id: {
      type: Date,
    },
    High: {
      type: Number,
      required: true,
    },
    Low: {
      type: Number,
      required: true,
    },
    Close: {
      type: Number,
      required: true,
    },
    Open: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false }
);

module.exports = model("EURUSDWeek", EURUSDWeek, "EURUSDWeek");