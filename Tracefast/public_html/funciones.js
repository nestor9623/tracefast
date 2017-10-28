/*global __dirname*/
//archivo necesario para ejecutar la consola de node
var express = require('express');
//ejecuto en una variable app la instacia de express
var app = express();
//requiero una conversion de la estructura del proyecto
var bodyParser = require('body-parser');
//uso la estructura del codigo como esta sin necesidad de descodificar el codigo ya como esta
app.use(bodyParser.urlencoded({extended: false}));
//este es mi archivo para las configuraciones de mi conexion con motores de bases de datos y la conexion
var db = require('./static/dao/db');
//Lo primordial es agregar mo dao para configurar las opciones que manejare del lado del server con el flujo de datos
var login = require('./static/dao/daoLogin');
//creo una variable servidor
var server;

/**
 * Creo la configuracion del servidor , donde especifio que puerto escuchara y cual sera la ruta especifica
 * sobre la cual voy a trabajar
 * @returns {undefined}
 */

function configurarServidor() {
        //la direccion donde ejecutare el primer index.html que vea sera en la siguiente
     app.use(express.static(__dirname + '/static'));
     //el servidor estaria escuchando en el puerto 9999
    server = app.listen(9999, function () {
        //muestro un mensaje que estoy corriendo el servidor
        console.log("servidor web iniciado!");
    });

}
//desde la carpeta de static busque la url /login que especificamos en el controlador
//esto lo permite hacer node sin necesidad de estar buscando directamente en la raiz del directorio
app.post('/login', function (entrada, respuesta) {
    login.validar(entrada, respuesta);
});
app.post('/registrousuario', function (entrada, respuesta) {
    login.registrarUsuario(entrada, respuesta);
});

//exporto la configuracion del servidor
exports.configurarServidor = configurarServidor;

