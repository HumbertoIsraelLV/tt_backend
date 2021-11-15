var axios = require("axios").default;

const getModel = require("../Models/Candle");

const common_options = {
    method: 'GET',
    url: 'https://alpha-vantage.p.rapidapi.com/query',
    headers: {
        'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
        'x-rapidapi-key': 'b316ebd09amshf50a58965c26287p172949jsn245bd73d4ab4'
    }
};

//FOR DAY
const day_options = {
    ...common_options,
    params: {
        function: 'FX_DAILY',
        from_symbol: 'EUR',
        datatype: 'json',
        outputsize: 'compact',
        to_symbol: 'USD'
    }
};

//FOR HOUR
var hour_options = {
    ...common_options,
    params: {
      from_symbol: 'EUR',
      to_symbol: 'USD',
      interval: '60min',
      function: 'FX_INTRADAY',
      outputsize: 'compact',
      datatype: 'json'
    }
};

//FOR MONTH
var month_options = {
    ...common_options,
    params: {
        function: 'FX_MONTHLY', 
        to_symbol: 'USD', 
        from_symbol: 'EUR', 
        datatype: 'json'
    }
};

//FOR WEEK
const week_options = {
    ...common_options,
    params: {
        to_symbol: 'USD', 
        from_symbol: 'EUR', 
        function: 'FX_WEEKLY', 
        datatype: 'json'}
};

const updater = async (collection_name, config) => {
    const {options, delay} = config;
    setTimeout(()=>{
        axios.request(options).then(async(response) => {
            elements=Object.getOwnPropertyNames(response.data);
            candles=response.data[elements[1]];
            delete candles[Object.keys(candles)[0]];
            items_list=[];
            Object.getOwnPropertyNames(candles).forEach(key => {
                item={};
                date=new Date(key);
                item["_id"]=date;
                item["open"]=parseFloat(candles[key]["1. open"]);
                item["high"]=parseFloat(candles[key]["2. high"]);
                item["low"]=parseFloat(candles[key]["3. low"]);
                item["close"]=parseFloat(candles[key]["4. close"]);
                items_list.push(item);
            });
            modelInstance=getModel(collection_name);
            try {
                modelInstance.collection.insertMany(items_list, (err, docs)=>{
                    if(err){
                        const is_duplicate_error=err.toString().indexOf('duplicate key error');
                        if(is_duplicate_error==-1)
                            console.log(err);
                    }
                    // console.log(docs);
                });
            }catch (err) {
                console.log(err.message);
            }
        }).catch((err) => {
            console.error(err);
        });
        console.log("collection: "+collection_name+" updated.");
        updater(collection_name, config);
    }, delay);
};

const updateDB = async () => {
    collection_options={
        //TODO: Resolve centralization of collection names
        "Day": {
            options:    day_options,
            delay:      5000000  //each day
        },
        "Hour": {
            options:    hour_options,
            delay:      3600000  //each hour
        },
        "Month": {
            options:    month_options,
            delay:      2419200000  //each month
        },
        "Week": {
            options:    week_options,
            delay:      604800000  //each week
        },
    };
    Object.getOwnPropertyNames(collection_options).forEach(collection => {
        updater(collection, collection_options[collection]);
    });
};

module.exports = updateDB;