//para node esta es la libreria de mysql
var mysql = require('mysql');

//creo la conexion , con el usuario , password , la base del proyecto , y la url
var conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'proyecto'
});

//me intento conectar a la conexion con los datos de acceso
conexion.connect(function (error) {
    if (error)
        console.log('Problemas de conexion con el motor de la base de datos  \n Error:::::::::::'+error);
    
    else
        console.log('conexion establecida!');
});


module.exports = conexion;
