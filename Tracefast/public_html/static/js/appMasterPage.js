
/*Se definen las depenciencias que seran utilizadas por el sistema*/
var app = angular.module("appMasterPage", ['ngRoute']);


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
app.config(function ($routeProvider) {
    $routeProvider

            .when('/Proyectos', {
                //controller: 'controladorProyectos',
                controller: 'controladorProyectos',
                templateUrl: 'Director/proyectos.html'
            })  
            .otherwise({
                redirectTo: '/'
            });
});







