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
app.controller('CtlLogIn', function ($scope, $window, logInService) {
    /*CAPTURO LOS DATOS DE LO QUE RECIBO POR PARAMETRO EN UNA VARIABLE IDENTIFICACION 
     * Y LA IDENTO AL SCOPE*/
    $scope.identificacion = "";
    /*
     * METODO LOGIN
     * RECIVE POR PARAMETRO UN FORMULARIO Y VALDA QUE SI TENGA DATOS PARA MANDARSELO AL SERVICIO 
     * PARA QUE PUEDA CONSUMIR ESTA INFORMACION
     * 
     * */
    $scope.logIn = function (form) {
        if (form) {
            logInService.logIn($scope.identificacion).then(function (response) {
                /**
                 * UNA VEZ SEPA QUE DATOS DE USUARIO SON LOS QUE TRAE EMPIEZO CON LA VALIDACION DE USUARIOS
                 * Y EMPIEZO A REDIRECCIONAR
                 * EN ESTE EJEMPLO COMPARO QUE EL CODIGO QUE ME LLEGA JUNTO AL TIPO SEAN LOS SIGUIENTES
                 * SI LA CONDICION SE CUMPLE , CAPTURO LOS DATOS Y LOS AGREGO A MI VARIABLE DE SESION
                 * QUE SERIA EL USUARIO Y EL TIPO DESPUES DE ESTO REDIRECCIONO
                 */
                if (response.codigo === 1 && response.type=="Administrador") {
                    
                    sessionStorage.setItem("session", response.type);
                    sessionStorage.setItem("usuarioId",response.usuarioId);               
                    
  
                    $window.location.href = 'http://localhost:9999/views/principal.html';
                }else if(response.codigo === 1 && response.type=="Integrante"){
                    
                     sessionStorage.setItem("session",response.type);
                     sessionStorage.setItem("usuarioId",response.usuarioId);
                     $window.location.href = 'http://localhost:9999/views/PrincipalIntegrante.html';
                }else{
                    alert("verifique correo y password");
                }
            });
        } else {
            alert("Verifique los datos ingresados");
        }
    };

/**
 * @author Nestor andres franco betancur
 * @param {type} form envio el formulario completo con los datos que recibo desde la vista para interpretarlos
 * @returns {Mensaje} ya sea con la creacion del usuario o con un mensaje de error
 */
    $scope.registrarUsuarios = function (form) {
        /**
         * primero valido que el formulario que envian no este vacio
         */
        if (form ) {
            /**
             * luego comparo que las contraseñas sean las mismas
             */
            if($scope.identificacion.password===$scope.identificacion.repeatpassword){
                /**
                 * cuando comparo eso entro a mandarle el formulario que viene con informacion
                 * al servicio para que consuma esos datos
                 */
                logInService.crearUsuario($scope.identificacion).then(function (response) {                
                
                /**
                 * si la respuesta que me envia cuando creo datos es 1 , creo el cliente sino es 1 
                 * es por que lanza un error cuando lo creo
                 */
                if (response.codigo === 1) {
                    alert("El usuario se ha creado con exito");
                    /**
                     * una vez sepa que se creo el usuario limpio el scope , la informacion que ya tengo 
                     * para que cuando haga otro registro no tome la misma informacion 
                     * y una vez hecha la creacion redirecciono a la pagina solicitada
                     */
                    $scope.identificacion = "";
                    $window.location.href="http://localhost:9999";
                } else {
                    /**
                     * sino mostraria un mensaje de error donde no puedo crear el usuario
                     */
                    alert("No se pudo crear el registro");
                    $scope.identificacion = "";
                }
            });
            }else{
                alert("las password no coinciden!");
            }
            
            
        } else {
            alert("Verifique los datos ingresados");
        }
    };

    /*Se define una funcion para agregar el cierre de la sesion*/
    $scope.logOut = function () {
        /*Se eliminan las variables de sesion*/
        sessionStorage.clear();
        /*Redireccionamiento*/
        $window.location.href = 'http://localhost:9999';
    };
});






