const express = require("express");
const cors = require("cors");
require ('dotenv').config();
const {dbConnection}=require('./database/config')

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

        //Conectar a base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();
        
        //Rutas de la app
        this.routes();
    }
    async conectarDB(){
        await dbConnection();
    }
    middlewares(){
        //CORS
        // this.app.use(cors());

        //LECTURA Y PARSEO DEL BODY
        this.app.use(express.json());

        //DIRECTORIO PUBLIC
        this.app.use(express.static('public'));
    }
    routes(){
        this.app.use(this.paths.day, require('./Routes/Day.js'));
        this.app.use(this.paths.hour, require('./Routes/Hour.js'));
        this.app.use(this.paths.month, require('./Routes/Month.js'));
        this.app.use(this.paths.week, require('./Routes/Week.js'));
        this.app.use(this.paths.year, require('./Routes/Year.js'));
    }
    listen(){
        this.app.listen(this.port, ()=>{
            console.log("Process corriendo en port: ", this.port);
        });
    }
}
const server = new Server();
server.listen();