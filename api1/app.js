'use strict'
const bodyParser = require('body-parser')
const cors = require('cors');
const express = require('express')
const dotenv = require('dotenv');
var connect = require('./src/connection/connection');
const cookieParser = require('cookie-parser');

const app = express()
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const port = 30300
dotenv.config({path:'./config/config.env'}); 




if(connect)
{
    console.log('creando servidor');

    //Archivos de rutas

    //middlewares
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json());
    app.use(cookieParser());
    

    //CORS
    //Permisos CORS para acceso a la Api
app.all('*', function(req, res,next) {
    /**
     * Response settings
     * @type {Object}
     */
    var responseSettings = {
        "AccessControlAllowOrigin": req.headers.origin,
        "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
        "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
        "AccessControlAllowCredentials": true
    };

    /**
     * Headers
     */
    res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials);
    res.header("Access-Control-Allow-Origin",  responseSettings.AccessControlAllowOrigin);
    res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : "x-requested-with");
    res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }


});

    //Rutas

    app.listen(port,()=>{
        console.log("Servidor corriendo por el puerto: " + port)
    })

    require('./src/routes/UsuarioRoutes')(app);
    require('./src/routes/RolesRoutes')(app);

    
    io.on('connection',(socket)=>{
        console.log('ususario conectado')
    })

    app.get('/',(req,resp)=>{
       resp.status(200).send({
        mensaje:'hola bienvenido al servidor de app1'
       }) 
    })

}