"use strict";

/**
 * SSERVICIO PARA CONSUMIR LOS DATOS QUE VIENEN DESDE EL CLIENTE Y LOS ESTRUCTURA DESDE EL CONTROLADOR "CTLLOGIN"
 * PARA MANDARLOS A QUE SEAN CONSUMIDOS
 * @type type
 */
app.service('logInService', function ($http, $httpParamSerializerJQLike) {

    this.logIn = function (identificacion) {
        /*El resultado del $http es almacenado en la promesa*/
        /*Ademas se debe definir el tipo de cabecera para enviar los datos
         * una vez hecho esto envio mi usuario y mi password a una url /login que seria mi DAO o el BO
         * */
        
        var promise = $http({
            method: "post",
            url: "/login",
            data: $httpParamSerializerJQLike({
                usuario: identificacion.usuario,
                password: identificacion.password}),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function mySucces(response) {
            /*Todos los datos se almacenan en .data
             * En este sabria si cuando consumo desde el servicio con los datos que me llegan
             * son correctos o es la informacion que necesito pero eso no lo valida directamente el servicio
             * aca valido si consumo informacion si trae datos o no los retorno para mostrar ya sea
             * mi mensaje de erroro de exito retornando la informacion en el .response
             *
             * */
            
            return response.data;
        }, function myError(response) {
            alert("Error");
            alert(response.statusText);
        });

        /*Luego se retorna la promesa*/
        return promise;
    };

/***
 * @author Nestor andres franco betancur
 * @param {type} identificacion envio todo el usuario en identificacion con los datos que necesito para registrarlo
 * valido que la informacion sea la correcta y se la paso al dao para que valida la creacion en base de datos
 * @returns {la promesa} con la respuesta de si el usuario se creo correctamente o no
 */

    this.crearUsuario = function (identificacion) {        
        var promise = $http({
            method: "post",
            url: "/registrousuario",
            data: $httpParamSerializerJQLike({
                tipodocumento: identificacion.tipodocumento,                
                numero: identificacion.numero,
                nombre: identificacion.nombre,
                apellido: identificacion.apellido,
                tipouser: identificacion.tipouser,
                email: identificacion.email,
                password: identificacion.password,
                repeatpassword: identificacion.repeatpassword,
                fechanacimiento: identificacion.fechanacimiento
            }),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function mySucces(response) {
            /*Todos los datos se almacenan en .data*/
            return response.data;
            
            console.log(response);
        }, function myError(response) {                        
            
            console.log(response.statusText);
        });

        /*Luego se retorna la promesa*/
        return promise;
    };


});