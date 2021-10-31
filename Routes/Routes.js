const express = require("express");
var axios = require("axios").default;

const getModel = require("../Models/Candle");

const getRoutes = (collection_name) =>
{
    const Model = getModel(collection_name);
    const router = express.Router();
    
    //GET ALL THE DOCUMENTS WITHIN A DELIMITED DATE RANGE
    router.get("/Range", async (req, res) => {
      var {start_date, end_date} = req.body;
      start_date = start_date? start_date : "2000-01-01T00:00:00.000Z"; 
      end_date = end_date? end_date : "2022-01-01T00:00:00.000Z"; 
      try {
        const result = await Model.find({'_id': {'$gte':start_date, '$lte':end_date}});
        res.json(result);
      } catch (err) { 
        res.status(500).json({ message: err.message });
      }
    });
    
    //ML ROUTES
    router.get("/ML", async (req, res) => {
      var {forecast_or_train, start_date, end_date} = req.body;
      const data = {
          collection_name,
          forecast_or_train: forecast_or_train? forecast_or_train : "forecast",
          start_date: start_date? start_date : "2000-01-01T00:00:00.000Z",
          end_date: end_date? end_date : "2022-01-01T00:00:00.000Z"
      }
      try {
        const result = await axios.post(process.env.PYTHON_URL, data);
        res.json(result.data);
      } catch (err) { 
        res.status(500).json({ message: err.message });
      }
    });

    //ADD A NEW DOCUMENT
    router.post("/", async (req, res) => {
      const modelInstance = new Model({
        _id: req.body._id,
        High: req.body.High,
        Low: req.body.Low,
        Close: req.body.Close,
        Open: req.body.Open,
      });
      try {
        const newDocument = await modelInstance.save();
        res.status(201).json(newDocument);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    });

    return router;
}

module.exports = getRoutes;