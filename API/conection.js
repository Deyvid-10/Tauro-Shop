const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve(__dirname, process.env.NODE_ENV + '.env')
});

// Configuración de la conexión a la base de datos
const conexion = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE 
});

// Conectar la base de datos
conexion.connect(error => {
    if (error) {
      console.error('Error de conexión a la base de datos:', error);
      return;
    }
    console.log('Conexión exitosa a la base de datos MySQL');
  });

module.exports = {conexion}
