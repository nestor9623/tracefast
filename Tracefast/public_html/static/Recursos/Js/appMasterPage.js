/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global app */

"use strict";

var app = angular.module("appMasterPage", ['ngRoute']);


/*Controlador global, que cada vez que se cargue la pagina masterPage 
 * valida si ya inicio sesion para saber si se deja o se redirecciona 
 * al index*/
app.controller('CtlValidate', function ($scope, $window) {
    /*Se almacena en el modelo sesion, este es utilizado por el ng-show 
     * para saber si muestra o no la interfaz grafica*/

    $scope.sesion = sessionStorage.getItem("sesion");
    console.log("variable session "+$scope.sesion);
    /*Luego se valida para saber si se redirecciona o no*/
    if (!$scope.sesion) {
        $window.location.href = 'http://localhost:1234/Director/PaginaPrincipalAdministrador.html';
    }
});

app.config(function ($routeProvider) {
    $routeProvider

            .when('/Costos', {
                controller: 'ControladorAdministradorCostos',
                templateUrl: 'VistasAdministrador/Costos/VistaCostos.html'
            })
            .when('/TipoCuenta', {
                controller: 'ControladorAdministradorTipoCuenta',
                templateUrl: 'VistasAdministrador/Cuenta/TipoCuenta.html'
            }).when('/Banco', {
        controller: 'ControladorAdministradorBanco',
        templateUrl: 'VistasAdministrador/Banco/Banco.html'
    })
            .when('/Cuenta', {
                controller: 'ControladorAdministradorCuenta',
                templateUrl: 'VistasAdministrador/Cuenta/Cuenta.html'
            })
            .when('/Cargos', {
                controller: 'ControladorAdministradorCargos',
                templateUrl: 'VistasAdministrador/Cargos/Cargos.html'
            })
            .when('/Paises', {
                controller: 'ControladorAdministradorPais',
                templateUrl: 'VistasAdministrador/Paises/Pais.html'
            })
            .when('/Ciudades', {
                controller: 'ControladorAdministradorCiudad',
                templateUrl: 'VistasAdministrador/Paises/Ciudad.html'
            })
            .when('/Departamentos', {
                controller: 'ControladorAdministradorDepartamento',
                templateUrl: 'VistasAdministrador/Paises/Departamento.html'
            })
            .when('/Junta', {
                controller: 'ControladorAdministradorJunta',
                templateUrl: 'VistasAdministrador/Empleados/Empleados.html'
            })
            .when('/Empleados', {
                controller: 'ControladorAdministradorEmpleado',
                templateUrl: 'VistasAdministrador/Empleados/Empleado.html'
            })

            .when('/Sucursal', {
                controller: 'ControladorAdministradorSucursal',
                templateUrl: 'VistasAdministrador/Sucursal/Sucursal.html'
            })

            .when('/Clientes', {
                controller: 'ControladorAdministradorCliente',
                templateUrl: 'VistasAdministrador/Empleados/Cliente.html'
            })

            .otherwise({
                redirectTo: '/'
            });
});

app.controller('ControladorAdministradorCostos', function ($scope, $http, ServicioCostos) {
    $scope.obj = "";
    $scope.saveCosto = function (form) {
        if (form) {
            ServicioCostos.guardarCosto($scope.obj).then(function (response) {
                if (response.status) {
                    alert("Operacion exitosa");
                    $scope.obj = "";
                } else {
                    alert(response);
                    /*Solo con limpiar el objeto se limpian todos los input 
                     * asociados*/
                }
            });
        } else {
            alert("Verifique los datos ingresados");
        }
    };
    //Para listar todos los campos
    $http.post('Listas/Administrador/listarCostos.php').success(function (data) {
        $scope.costos = data;
    });

    $scope.ordenarPor = function (tipo) {
        $scope.ordenSeleccionado = tipo;

    };

});

app.controller('ControladorAdministradorSucursal', function ($scope, $http, ServicioSucursal) {
    $scope.obj = "";
    $scope.guardarSede = function (form) {
        if (form) {
            ServicioSucursal.guardarSede($scope.obj).then(function (response) {
                if (response.status) {
                    alert("Operacion exitosa");
                    $scope.obj = "";
                } else {
                    alert(response);
                    /*Solo con limpiar el objeto se limpian todos los input 
                     * asociados*/
                }
            });
        } else {
            alert("Verifique los datos ingresados");
        }
    };
    //Para listar todos los campos
    $http.post('Listas/Administrador/listarSucursales.php').success(function (data) {
        $scope.sedes = data;
    });

    $scope.ordenarPor = function (tipo) {
        $scope.ordenSeleccionado = tipo;

    };
});
app.controller('ControladorAdministradorTipoCuenta', function ($scope, $http, ServicioTipoCuenta) {
    $scope.obj = "";
    $scope.saveTipoCuenta = function (form) {
        if (form) {
            ServicioTipoCuenta.guardarTipoCuenta($scope.obj).then(function (response) {
                if (response.status) {
                    alert("Operacion exitosa");
                    $scope.obj = "";
                } else {
                    alert(response);
                    /*Solo con limpiar el objeto se limpian todos los input 
                     * asociados*/
                }
            });
        } else {
            alert("Verifique los datos ingresados");
        }
    };

    $http.post('Listas/Administrador/listarTipoCuentas.php').success(function (data) {
        $scope.tipocuenta = data;
    });

    $scope.ordenarPor = function (tipo) {
        $scope.ordenSeleccionado = tipo;

    };


});
app.controller('ControladorAdministradorBanco', function ($scope, $http, ServiceBanco) {
    /*Se inicializa el modelo*/
    $scope.obj = "";
    $scope.saveBanco = function (form) {
        if (form) {

            ServiceBanco.guardarBanco($scope.obj).then(function (response) {

                if (response.status) {
                    alert(response.status);
                    $scope.obj = "";
                } else {
                    alert(response);
                }
            });
        } else {
            alert("Verifique los datos ingresados");
        }

    };
    $scope.buscar = function (form) {
        if ($scope.obj.codigo !== "") {
            alert('guardar');
            ServiceBanco.buscar($scope.obj).then(function (response) {
                if (response.length > 0) {
                    $scope.obj = response[0];
                } else {
                    alert("No hay registros en la base de datos")
                }
            });
        } else {
            alert("Verifique los datos ingresados");
        }
    };
});

app.controller('ControladorAdministradorCuenta', function ($scope, $http, ServicioCuenta) {
    $scope.obj = "";
    $scope.guardarCuenta = function (form) {
        if (form) {
            ServicioCuenta.guardarCuenta($scope.obj).then(function (response) {
                if (response.status) {
                    alert("Operacion exitosa");
                    $scope.obj = "";
                } else {
                    alert(response);
                }
            });
        } else {
            alert("Verifique los datos ingresados");
        }
    };


    $scope.buscarCuenta = function (form) {
        if ($scope.obj.codigo !== "") {
            ServicioCuenta.buscar($scope.obj).then(function (response) {
                if (response.length === 1) {
                    alert(response.length);
                    $scope.obj = response[0];
                    alert(response.length);
                    //$scope.txtNombre = nombre+'hola';
                } else if (response.length > 1) {

                    $scope.cuentas = [];
                    for (var i = 0; i < response.length; i++)
                    {
                        $scope.clientes.push(response[i]);
                    }
                    alert("No hay registros en la base de datos")
                }
            });
        } else {
            alert("Verifique los datos ingresados");
        }
    };

    //
    $scope.eliminarCuenta = function (form) {
        if ($scope.obj.codigo !== "") {
            alert($scope.obj.cedula);
            ServicioCuenta.eliminar($scope.obj).then(function (response) {
                if (response.status) {
                    alert('elimino');
                } else {
                    alert(response.status);
                    alert("No hay registros en la base de datos")
                }
            });
        } else {
            alert("Verifique los datos ingresados");
        }
    };

    $scope.updateCuenta = function (form) {

        alert('entro a actualizar');
        if ($scope.obj.codigo !== "") {
            alert($scope.obj.cedula);
            ServicioCuenta.update($scope.obj).then(function (response) {
                if (response.status) {
                    alert('actualizo');
                    //$scope.txtNombre = nombre+'hola';
                } else {
                    alert(response.status);
                    alert("No hay registros en la base de datos")
                }
            });
        } else {
            alert("Verifique los datos ingresados");
        }

    };
    $http.post('Listas/Administrador/listarCuentas.php').success(function (data) {
        $scope.cuenta = data;
    });

    $scope.ordenarPor = function (tipo) {
        $scope.ordenSeleccionado = tipo;

    };

    $scope.setSelected = function (objeto) {
        //alert(objeto.nombre);         
       $scope.obj = objeto;
        
    };


});
app.controller('ControladorAdministradorCargos', function ($scope, $http, ServiceCargo) {

    /*Se inicializa el modelo*/
    $scope.obj = "";
    $scope.saveCargo = function (form) {
        if (form) {
            /*Se ejecuta la funcion mandando por parametro el objeto obj, 
             * el cual esta asociado a los input*/
            ServiceCargo.guardarCargo($scope.obj).then(function (response) {
                /*El resultado de la promesa se recibe por parametro*/
                if (response.status) {
                    alert(response.status);
                    $scope.obj = "";
                } else {
                    alert(response);
                    /*Solo con limpiar el objeto se limpian todos los input 
                     * asociados*/
                }
            });
        } else {
            alert("Verifique los datos ingresados");
        }

    };
    $scope.buscar = function (form) {
        if ($scope.obj.codigo !== "") {
            alert('guardar');
            cargoService.buscar($scope.obj).then(function (response) {
                if (response.length > 0) {
                    $scope.obj = response[0];
                } else {
                    alert("No hay registros en la base de datos")
                }
            });
        } else {
            alert("Verifique los datos ingresados");
        }
    };



});
app.controller('ControladorAdministradorCiudad', function ($scope, $http, ciudadService) {

    /*Se inicializa el modelo*/
    $scope.obj = "";
    $scope.guardarCiudad = function (form) {
        /*Al ser el servicio la llamada por http (funcion asincrona) toca definir
         * promesas con el "then", que se ejecuta unicamente cuando se le retorna
         * un valor valido. Este se ejecuta unicamente cuando el llamado http 
         * consume el REST ("REST" es un paradigma, mientras"RESTful" describe el 
         * uso de ese paradigma*/

        /*Si el formulario esta bien validado*/
        if (form) {
            /*Se ejecuta la funcion mandando por parametro el objeto obj, 
             * el cual esta asociado a los input*/
            ciudadService.guardarCiudad($scope.obj).then(function (response) {
                /*El resultado de la promesa se recibe por parametro*/
                if (response.status) {
                    alert("Operacion");
                    $scope.obj = "";
                } else {
                    alert(response);
                    /*Solo con limpiar el objeto se limpian todos los input 
                     * asociados*/
                }
            });
        } else {
            alert("Verifique los datos ingresados");
        }

    };
    $scope.buscarCiudad = function (form) {
        if ($scope.obj.id !== "") {
            ciudadService.buscarCiudad($scope.obj).then(function (response) {
                if (response.length > 0) {
                    $scope.obj = response[0];
                } else {
                    alert("No hay registros en la base de datos")
                }
            });
        } else {
            alert("Verifique los datos ingresados");
        }
    };
    $scope.actualizarCiudad = function (form) {

        alert('entro a actualizar');
        if ($scope.obj.id !== "") {
            alert($scope.obj.id);
            ciudadService.actualizarCiudad($scope.obj).then(function (response) {
                alert(response);
                if (response.status) {
                    alert('actualizo');
                    //$scope.txtNombre = nombre+'hola';
                } else {
                    alert(response.status);
                    alert("No hay registros en la base de datos")
                }
            });
        } else {
            alert("Verifique los datos ingresados");
        }

    };
    $scope.eliminarCiudad = function (form) {
        if ($scope.obj.id !== "") {
            alert($scope.obj.id);
            ciudadService.eliminarCiudad($scope.obj).then(function (response) {
                if (response.status) {
                    alert('elimino');
                    //$scope.txtNombre = nombre+'hola';
                } else {
                    alert(response.status);
                    alert("No hay registros en la base de datos")
                }
            });
        } else {
            alert("Verifique los datos ingresados");
        }


    };

});
app.controller('ControladorAdministradorDepartamento', function ($scope, $http,departamentoService) {
    /*Se inicializa el modelo*/
    $scope.departamento = [];
    $scope.obj = "";

    $scope.guardarDepartamento = function (form) {
        /*Al ser el servicio la llamada por http (funcion asincrona) toca definir
         * promesas con el "then", que se ejecuta unicamente cuando se le retorna
         * un valor valido. Este se ejecuta unicamente cuando el llamado http 
         * consume el REST ("REST" es un paradigma, mientras"RESTful" describe el 
         * uso de ese paradigma*/

        /*Si el formulario esta bien validado*/
        if (form) {
            /*Se ejecuta la funcion mandando por parametro el objeto obj, 
             * el cual esta asociado a los input*/
            departamentoService.guardarDepartamento($scope.obj).then(function (response) {
                /*El resultado de la promesa se recibe por parametro*/
                alert($scope.obj + "hola");
                if (response.status) {
                    alert("Operacion");
                    $scope.obj = "";
                } else {
                    alert(response);
                    /*Solo con limpiar el objeto se limpian todos los input 
                     * asociados*/
                }
            });
        } else {
            alert("Verifique los datos ingresados");
        }

    };
    $scope.buscarDepartamento = function (form) {
        if ($scope.obj.id !== "") {
            departamentoService.buscarDepartamento($scope.obj).then(function (response) {
                if (response.length > 0) {
                    $scope.obj = response[0];
                } else {
                    alert("No hay registros en la base de datos")
                }
            });
        } else {
            alert("Verifique los datos ingresados");
        }
    };
    $scope.listarDepartamentos = function () {
        departamentoService.listaDepartamento().then(function (response) {
            $scope.departamento = [];
            if (response[0].res !== 0) {
                $scope.departamento.length = 0;
                for (var i = 0; i < response.length; i++) {
                    $scope.departamento.push({nombre: response[i].nombre, id:
                                response[i].id
                    });
                }
            }
        });
    };
    $scope.actualizarDepartamento = function (form) {

        alert('entro a actualizar');
        if ($scope.obj.id !== "") {
            alert($scope.obj.id);
            departamentoService.actualizarDepartamento($scope.obj).then(function (response) {
                alert(response);
                if (response.status) {
                    alert('actualizo');
                    //$scope.txtNombre = nombre+'hola';
                } else {
                    alert(response.status);
                    alert("No hay registros en la base de datos")
                }
            });
        } else {
            alert("Verifique los datos ingresados");
        }

    };
    $scope.eliminarDepartamento = function (form) {
        if ($scope.obj.id !== "") {
            alert($scope.obj.id);
            departamentoService.eliminarDepartamento($scope.obj).then(function (response) {
                if (response.status) {
                    alert('elimino');
                    //$scope.txtNombre = nombre+'hola';
                } else {
                    alert(response.status);
                    alert("No hay registros en la base de datos")
                }
            });
        } else {
            alert("Verifique los datos ingresados");
        }


    };
    /*Se define una funcion en el controlador*/


});
app.controller('ControladorAdministradorPais', function ($scope, $http,paisService) {   
    
    /*Se inicializa el modelo*/
    $scope.obj = "";
    $scope.guardarPais = function (form) {
        /*Al ser el servicio la llamada por http (funcion asincrona) toca definir
         * promesas con el "then", que se ejecuta unicamente cuando se le retorna
         * un valor valido. Este se ejecuta unicamente cuando el llamado http 
         * consume el REST ("REST" es un paradigma, mientras"RESTful" describe el 
         * uso de ese paradigma*/

        /*Si el formulario esta bien validado*/
        if (form) {
            /*Se ejecuta la funcion mandando por parametro el objeto obj, 
             * el cual esta asociado a los input*/
            paisService.guardarPais($scope.obj).then(function (response) {
                /*El resultado de la promesa se recibe por parametro*/
                console.log($scope.obj);
                alert("hola")
                if (response.status) {
                    alert("Operacion");
                    $scope.obj = "";
                } else {
                    alert(response);
                    /*Solo con limpiar el objeto se limpian todos los input 
                     * asociados*/
                }
            });
        } else {
            alert("Verifique los datos ingresados");
        }
        
    };
    $scope.buscarPais = function (form) {
        if ($scope.obj.id !== "") {
            paisService.buscarPais($scope.obj).then(function (response) {
                if (response.length > 0) {                    
                    $scope.obj = response[0];
                } else {
                    alert("No hay registros en la base de datos")
                }
            });
        } else {
            alert("Verifique los datos ingresados");
        }
    };
    $scope.eliminarPais = function (form) {
        if ($scope.obj.id !== "") {
            alert($scope.obj.id);
            paisService.eliminarPais($scope.obj).then(function (response) {
                if (response.status) {
                    alert('elimino');
                    //$scope.txtNombre = nombre+'hola';
                } else {
                    alert(response.status);
                    alert("No hay registros en la base de datos")
                }
            });
        } else {
            alert("Verifique los datos ingresados");
        }


    };
    $scope.actualizarPais= function (form) {

        alert('entro a actualizar');
        if ($scope.obj.id !== "") {
            alert($scope.obj.id);
            paisService.actualizarPais($scope.obj).then(function (response) {
                alert(response);
                if (response.status) {
                    alert('actualizo');
                    //$scope.txtNombre = nombre+'hola';
                } else {
                    alert(response.status);
                    alert("No hay registros en la base de datos")
                }
            });
        } else {
            alert("Verifique los datos ingresados");
        }

    };


});
app.controller('ControladorAdministradorEmpleado', function ($scope, $http, ServiceEmpleado) {
    /*Se inicializa el modelo*/
    $scope.obj = "";
    $scope.saveEmpleado = function (form) {
        if (form) {
            ServiceEmpleado.guardarEmpleado($scope.obj).then(function (response) {
                /*El resultado de la promesa se recibe por parametro*/
                if (response.status) {
                    alert(response.status);
                    $scope.obj = "";
                } else {
                    alert(response);
                    /*Solo con limpiar el objeto se limpian todos los input 
                     * asociados*/
                }
            });
        } else {
            alert("Verifique los datos ingresados");
        }

    };
    $scope.buscar = function (form) {
        if ($scope.obj.codigo !== "") {
            alert('guardar');
            clienteService.buscar($scope.obj).then(function (response) {
                if (response.length > 0) {
                    $scope.obj = response[0];
                } else {
                    alert("No hay registros en la base de datos")
                }
            });
        } else {
            alert("Verifique los datos ingresados");
        }
    };



    /*Se define una funcion en el controlador*/


});
app.controller('ControladorAdministradorCliente', function ($scope, $http, ServiceCliente) {
    $scope.clientes = [];
    $scope.obj = "";
    $scope.saveCliente = function (form) {
        if (form) {
            ServiceCliente.guardarCliente($scope.obj).then(function (response) {
                if (response.status) {
                    alert(response.status);
                    $scope.obj = "";
                } else {
                    alert(response);
                }
            });
        } else {
            alert("Verifique los datos ingresados");
        }

    };
    $scope.buscar = function (form) {
        if ($scope.obj.codigo !== "") {
            ServiceCliente.buscar($scope.obj).then(function (response) {
                if (response.length === 1) {
                    alert(response.length);
                    $scope.obj = response[0];
                    alert(response.length);
                    //$scope.txtNombre = nombre+'hola';
                } else if (response.length > 1) {

                    $scope.clientes = [];
                    for (var i = 0; i < response.length; i++)
                    {
                        $scope.clientes.push(response[i]);
                    }
                    alert("No hay registros en la base de datos")
                }
            });
        } else {
            alert("Verifique los datos ingresados");
        }
    };

    //
    $scope.eliminarCliente = function (form) {
        if ($scope.obj.codigo !== "") {
            alert($scope.obj.cedula);
            ServiceCliente.eliminar($scope.obj).then(function (response) {
                if (response.status) {
                    alert('elimino');
                    //$scope.txtNombre = nombre+'hola';
                } else {
                    alert(response.status);
                    alert("No hay registros en la base de datos")
                }
            });
        } else {
            alert("Verifique los datos ingresados");
        }
    };
    $scope.ordenarPorParametro = function (tipo)
    {
        $scope.ordenSeleccionado = tipo;
    };

    $scope.updateCliente = function (form) {

        alert('entro a actualizar');
        if ($scope.obj.codigo !== "") {
            alert($scope.obj.cedula);
            ServiceCliente.update($scope.obj).then(function (response) {
                if (response.status) {
                    alert('actualizo');
                    //$scope.txtNombre = nombre+'hola';
                } else {
                    alert(response.status);
                    alert("No hay registros en la base de datos")
                }
            });
        } else {
            alert("Verifique los datos ingresados");
        }

    };

    //$scope.buscar();
    /*Se define una funcion en el controlador*/

});