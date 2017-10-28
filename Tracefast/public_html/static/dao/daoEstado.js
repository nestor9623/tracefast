var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
var db = require('./db');


 function listadoEstado(entrada,respuesta) {
    
    var sql = 'select * from proyecto';

    //Se realiza la consulta, recibiendo por parametro filas los registros de la base de datos.         
    db.query(sql,function (error, filas) {
        if (error) {
            console.log('error en el listado');
            return;
        }
        
       
        var arreglo=[];
        
        
        
        //Se recorren los registros obtenidos
        
        for (var f = 0; f < filas.length; f++) {
           arreglo.push({nombreProyecto:filas[f].nombre,inicio:filas[f].inicio,fin:filas[f].fin,etapa:filas[f].etapa});
        }
      
        
        console.log(arreglo[0]);
        arreglo = JSON.stringify(arreglo);
        
        
        respuesta.writeHead(200, {'Content-Type': 'application/json'});
       
        respuesta.end(arreglo);
        
    });
}


exports.listadoEstado=listadoEstado;

