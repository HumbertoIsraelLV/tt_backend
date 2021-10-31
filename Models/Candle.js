const {Schema, model} = require("mongoose");

var models_instances={};

const createModel = (collection_name)=>{
    const candle_schema = new Schema(
      {
        _id: {
          type: Date,
          required: true,
        },
        high: {
          type: Number,
          required: true,
        },
        low: {
          type: Number,
          required: true,
        },
        close: {
          type: Number,
          required: true,
        },
        open: {
          type: Number,
          required: true,
        },
      },
      { versionKey: false }
    );
    models_instances[collection_name]=model(collection_name, candle_schema, collection_name);
    return models_instances[collection_name];
}

const getModel = (collection_name)=>{
    return models_instances[collection_name]? models_instances[collection_name] : createModel(collection_name);
}

module.exports = getModel;