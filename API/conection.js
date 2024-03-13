const mysql = require('mysql');

// Configuración de la conexión a la base de datos
const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Contrasena20',
  database: 'tauro_shop' 
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
