const {Schema, model} = require("mongoose");

var models_instances={};

const createModel = (collection_name)=>{
    const candle_schema = new Schema(
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
    models_instances[collection_name]=model(collection_name, candle_schema, collection_name);
    return models_instances[collection_name];
}

const getModel = (collection_name)=>{
    return models_instances[collection_name]? models_instances[collection_name] : createModel(collection_name);
}

module.exports = getModel;