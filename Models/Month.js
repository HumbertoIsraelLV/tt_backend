const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect(
  "mongodb+srv://aeternam:master.ae13@eurusd.yhq8o.mongodb.net/EURUSD?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
); //Si no existe, se crea

const EURUSDMonth = new Schema(
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

module.exports = mongoose.model("EURUSDMonth", EURUSDMonth, "EURUSDMonth");
