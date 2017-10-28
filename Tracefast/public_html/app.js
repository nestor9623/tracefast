/*
 * En este archivo lo que hago es ejecutar una configuracion de un javascript aparte sobre node
 */

var funciones = require('./funciones');

/**
 * aqui una vez instanciada la funcion para configurar servidor por que puedo tener varios servidores
 * corriendo sobre la misma aplicacion en el mismo proyecto
 */
funciones.configurarServidor();
