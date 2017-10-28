"use strict";

/*El use strict hace que se deba codificar de manera correcta, siendo estricto
 * a la hora de compilar el codigo ejemplo: 
 * x = 3.14; // This will cause an error (x is not defined)*/


/* global app */

/*Toda funcion de controlador debe tener un $scope, que es la referencia a todos
 * los elementos que pertenecen al constrolador*/
/*app.controller(nombre de la funcion)  ($scope, nombre de los servicios a utilizar)*/
/*$windows servicio por defecto para poder utilizar refresco de pagina y redireccionamiento*/
/*logInService, nombre del servicio que contiene la promesa. */
app.controller('controladorEstado', function ($scope, $window, estadoService) {


    /*info*/
    $scope.estado="";


    $scope.listadoProyectos;
            
 $scope.listarEstados = function () {
        console.log("entro controller");

        /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
         * el cual esta asociado a los input*/
        estadoService.listarEstado().then(function (response) {
            var entrada=[];
            var salida = [];
            
            
            for(var i=0;i<response.length;i++){
                entrada.push({nombreProyecto:response[i].nombreProyecto,inicio:new Date(response[i].inicio),fin:new Date(response[i].fin),etapa:response[i].etapa});
            }
            
            console.log(entrada);
           
           
           for(var j=0;j<entrada.length;j++){
               var hoy = new Date();
               
               //console.log(entrada[j].etapa==="100%");
               if(entrada[j].inicio.valueOf()===hoy.valueOf() && entrada[j].etapa==="100%"){
                   
                salida.push({nombreProyecto:response[j].nombreProyecto,inicio:entrada[j].inicio,fin:entrada[j].fin,etapa:entrada[j].etapa,estado:"AL DIA"});

               }else{
                salida.push({nombreProyecto:response[j].nombreProyecto,inicio:entrada[j].inicio,fin:entrada[j].fin,etapa:entrada[j].etapa,estado:"RETRASADO"});

               }
           }
           
           $scope.listadoEstado=salida;
           
           
            
        });
        
    };   
    
    
    
    
    $scope.getSelectedRow=function(){
        $scope.selected = this.obj;
        $scope.estado=$scope.selected;
        
    };
    
    

});







