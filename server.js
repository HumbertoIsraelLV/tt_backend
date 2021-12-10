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
            day:    `/${process.env.DAY}`, 
            hour:   `/${process.env.HOUR}`, 
            month:  `/${process.env.MONTH}`, 
            week:   `/${process.env.WEEK}`, 
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
        this.app.use(this.paths.day, getRoutes(process.env.DAY));
        this.app.use(this.paths.hour, getRoutes(process.env.HOUR));
        this.app.use(this.paths.month, getRoutes(process.env.MONTH));
        this.app.use(this.paths.week, getRoutes(process.env.WEEK));
    }
    listen(){
        this.app.listen(this.port, ()=>{
            console.log("Process corriendo en port: ", this.port);
        });
    }
}
const server = new Server();
updateDB();
server.listen();