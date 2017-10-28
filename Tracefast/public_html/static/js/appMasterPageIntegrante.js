
/*Se definen las depenciencias que seran utilizadas por el sistema*/
var app = angular.module("appMasterPageIntegrante", ['ngRoute']);


/*Controlador global, que cada vez que se cargue la pagina masterPage 
 * valida si ya inicio sesion para saber si se deja o se redirecciona 
 * al index*/
app.controller('CtlValidate', function ($scope, $window) {
    /*Se almacena en el modelo sesion, este es utilizado por el ng-show 
     * para saber si muestra o no la interfaz grafica*/
    
    $scope.sesion = sessionStorage.getItem("session");
    
    /*Luego se valida para saber si se redirecciona o no*/
    if (!$scope.sesion) {
        $window.location.href = 'http://localhost:9999';
    }
});
/**
 * Esta es mi configuracion de acceso para un controlador con una pagina web html
 */
app.config(function ($routeProvider) {
    $routeProvider

/**
 * aclar esto es un ejemplo , de que cuanto este direccionando en alguna parte de NODE JS mi servidor a la direccion
 * /estudiantes se va ejecutar solo y unicament eeste controlador para la url definida como se ejecuta
 */
            .when('/Estudiantes', {
                //controller: 'controladorEstudiantes',
                controller: 'controladorEstudiante',
                templateUrl: 'estudiante.html'
            })
            /**
             * cuando no se sabe a donde se redirecciona lo mando a la raiz local con el "redirec to:/"
             */
            .otherwise({
                redirectTo: '/'
            });
});







