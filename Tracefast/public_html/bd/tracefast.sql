/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  Nestor Andres franco
 * Se crea esta base de datos con base por ahora al registro de informacion desde la parte de usuarios
 * Created: 27/10/2017
 */

CREATE TABLE `registro` (
  `id` int(11) NOT NULL,
  `tipodocumento` varchar(50) NOT NULL,
  `numero` varchar(50) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `tipouser` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `repeatpassword` varchar(50) NOT NULL,
  `fechanacimiento` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `registro`
--

INSERT INTO `registro` (`id`, `tipodocumento`, `numero`, `nombre`, `apellido`, `tipouser`, `email`, `password`, `repeatpassword`, `fechanacimiento`) VALUES
(6, 'Cedula de ciudadania', '1094923', 'Jesus quintero', 'cardona', 'Integrante', 'jesus@gmail.com', 'jesus', 'jesus', '1993-12-30'),
(7, 'Cedula de ciudadania', '1094929802', 'Nestor andres', 'franco betancur', 'Administrador', 'nestor9623@hotmail.com', 'teto', 'teto', '1995-06-23'),
(9, 'Cedula de ciudadania', '1', 'nico', 'duque', 'Administrador', 'n@gmail.com', 'n', 'n', '2017-01-01'),
(10, 'Tarjeta de identidad', '2', 'mauro', 'hoyoz', 'Integrante', 'm@gmail.com', 'm', 'm', '2017-01-01'),
(11, 'Cedula de ciudadania', '1053802816', 'johnny', 'salazar', 'Administrador', 'johnny9052@hotmail.com', '12345', '12345', '2017-05-27'),
(12, 'Cedula de ciudadania', '1053802814', 'alexander', 'salazar', 'Integrante', 'alexander9052@hotmail.com', '12345', '12345', '2017-05-19');
