const express = require("express");
const cors = require("cors");
require ('dotenv').config();

const {dbConnection}=require('./database/config');
const getRoutes = require("./Routes/Routes");
const updateDB = require("./utils/updater");

class Server{
    constructor(){
        this.app=express();
        this.port=process.env.PORT;

        this.paths = {
            day:    '/Day', 
            hour:   '/Hour', 
            month:  '/Month', 
            week:   '/Week', 
            year:   '/Year', 
        };

        //CONECTAR A BASE DE DATOS
        this.conectarDB();

        //MIDDLEWARES
        this.middlewares();
        
        //RUTAS DE LA APP
        this.routes();
    }
    async conectarDB(){
        await dbConnection();
    }
    middlewares(){
        //CORS
        this.app.use(cors());

        //LECTURA Y PARSEO DEL BODY
        this.app.use(express.json());

        //DIRECTORIO PUBLIC
        this.app.use(express.static('public'));
    }
    routes(){
        this.app.use(this.paths.day, getRoutes("EURUSDDay"));
        this.app.use(this.paths.hour, getRoutes("EURUSDHour"));
        this.app.use(this.paths.month, getRoutes("EURUSDMonth"));
        this.app.use(this.paths.week, getRoutes("EURUSDWeek"));
        this.app.use(this.paths.year, getRoutes("EURUSDYear"));
    }
    listen(){
        this.app.listen(this.port, ()=>{
            console.log("Process corriendo en port: ", this.port);
        });
    }
}
const server = new Server();
updateDB(30000);
server.listen();