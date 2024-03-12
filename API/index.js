// Usar libreria express y cors
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// Importar libreria 
const MySQL = require('./conection')
const seguridad = require("./seguridad.js")

// Middleware para parsear el cuerpo de la solicitud como JSON y para dar permisos
app.use(express.json())
app.use(cors());

// Obteener informacion de articulos
app.get('/articulos', (pedido, respuesta) => {
    
    MySQL.conexion.query('SELECT * FROM articulos', (error, resultado) => {
      if (error) throw error
      respuesta.send(resultado)
    });
  });

// Obteener informacion de articulos por el id
app.get('/articulos/:id', (pedido, respuesta) => {
    
  MySQL.conexion.query(`SELECT * FROM articulos WHERE id = ${pedido.params.id}`, (error, resultado) => {
    if (error) throw error
    respuesta.send(resultado)
  });
});

// Obteener informacion de articulos filtrada 

let nombre = ''
let genero = ''
let categoria = ''

let reqerimiento = ``

app.get('/filtro/:Nombre/:Genero/:Categoria/:Talla', (pedido, respuesta) => {
  
  if(pedido.params.Nombre == 'null')
  {
    nombre = ''
  }
  else
  {
    nombre = pedido.params.Nombre
  }

  if(pedido.params.Genero == 'null')
  {
    genero = ''
  }
  else
  {
    genero = pedido.params.Genero
  }

  if(pedido.params.Categoria == 'null')
  {
    categoria = ''
  }
  else
  {
    categoria = pedido.params.Categoria
  }
  
  if(pedido.params.Talla == 'null')
  {
    reqerimiento = `SELECT * FROM articulos WHERE Nombre LIKE "%${nombre}%" AND Genero LIKE "%${genero}%" AND Categoria LIKE "%${categoria}%"`
  }
  else
  {
    reqerimiento = `SELECT * FROM articulos WHERE Nombre LIKE "%${nombre}%" AND Genero LIKE "%${genero}%" AND Categoria LIKE "%${categoria}%" AND ${pedido.params.Talla} = "True"`
  }


  MySQL.conexion.query(reqerimiento, (error, resultado) => {
    if (error) throw error
    respuesta.send(resultado)
  });
});

// Crear cuenta

app.post("/usuarios/registro", (pedido, respuesta) => {

  //let crypto_email = seguridad.encriptado(pedido.body.email)
  //let hash_contrasena = seguridad.hash(pedido.body.contrasena)

  MySQL.conexion.query(`INSERT INTO usuarios (Nombre, Apellido, Email, Contraseña, Direccion_envio, Metodo_pago, Telefono) VALUES ("${pedido.body.nombre}", "${pedido.body.apellido}", "${pedido.body.email}", "${pedido.body.contrasena}", "${pedido.body.direccion_envio}", "${pedido.body.metodo_pago}", "${pedido.body.telefono}")`, function(error, resultados) {

    if (error) throw error;
    respuesta.send(true);

  });
})

// Ingresar con la cuenta
app.post("/usuarios/ingreso", (pedido, respuesta) => {   
    
  //let crypto_email = seguridad.encriptado(pedido.body.email)
  //let hash_contrasena = seguridad.hash(pedido.body.contrasena)

  MySQL.conexion.query(`SELECT * FROM usuarios WHERE (Email = '${pedido.body.email}' AND Contraseña = '${pedido.body.contrasena}')`, function(error, resultados) {
 
      if(resultados.length === 0)
        respuesta.send(undefined);
      else
      {
        let array_usuario = [seguridad.crearToken(resultados[0]['id'], pedido.body.user), `${resultados[0].id}`]

        respuesta.send(array_usuario);
      }
  });
})

// Recuperar datos del ususario
app.get("/usuarios/datos/:id", seguridad.validarToken, (pedido, respuesta) => {  

  MySQL.conexion.query(`SELECT * FROM usuarios WHERE id = ${pedido.params.id}`, function(error, resultados) {
 
      respuesta.send(resultados);
    
});
})

// Editar usuario
app.put("/usuarios/datos/:id", seguridad.validarToken, (pedido, respuesta) => {
    
  MySQL.conexion.query(`UPDATE usuarios SET ? WHERE id = ?`, [pedido.body, pedido.params.id], (error, resultado) => {
    if (error) throw error
    respuesta.send("Datos actualizados correctamente")
  })

})

// Agregar articulos al carrito
app.post("/carrito/agregar", seguridad.validarToken,(pedido, respuesta) => {   
    
  MySQL.conexion.query(`SELECT * FROM carrito WHERE id_usuario = ${pedido.body.id_usuario} AND id_articulo = ${pedido.body.id_articulo} AND Talla = "${pedido.body.talla}"`, (error, articulo_repetido) => {
   

    if(articulo_repetido.length !== 0)
    {
      MySQL.conexion.query(`UPDATE carrito SET Cantidad = ${pedido.body.cantidad + articulo_repetido[0].Cantidad} WHERE id = ${articulo_repetido[0].id}`, function(error, resultados) {
        if (error) throw error
        respuesta.send("Ya tienes este articulo al carrito, se agrego la cantidad seleccionada a tu pedido")     
      });
    }
    else
    {
      MySQL.conexion.query(`INSERT INTO carrito (id_usuario, id_articulo, Cantidad, Talla) VALUES (${pedido.body.id_usuario}, ${pedido.body.id_articulo}, ${pedido.body.cantidad}, "${pedido.body.talla}")`, function(error, resultados) {
        if (error) throw error
        respuesta.send("Articulo agregado al carrito")     
      });
    }

  })
})

// ARTICULOS EN EL CARRITO POR EL ID DE USUARIO
app.get("/carrito/ver/:id_usuario", seguridad.validarToken, (pedido, respuesta) => {
  MySQL.conexion.query(`SELECT carrito.id, carrito.id_usuario, carrito.id_articulo, carrito.Cantidad, carrito.Talla, articulos.Nombre, articulos.Precio, articulos.Portada FROM carrito INNER JOIN articulos ON carrito.id_articulo = articulos.id WHERE id_usuario = ${pedido.params.id_usuario} `, (error, resultado) => {
    if (error) throw error
    respuesta.send(resultado)
  });
})

// Eliminar articulos del carrito por id
app.delete("/carrito/eliminar/:id", seguridad.validarToken, (pedido, respuesta) => {
  MySQL.conexion.query(`DELETE FROM carrito WHERE id = ${pedido.params.id} `, (error, resultado) => {
    if (error) throw error
    respuesta.send("Articulo eliminado del carrito correctamente")
  });
})

// Eliminar todos los articulos del carrito
app.delete("/carrito/eliminar_todo", seguridad.validarToken, (pedido, respuesta) => {
  MySQL.conexion.query(`DELETE FROM carrito`, (error, resultado) => {
    if (error) throw error
    respuesta.send("Articulo eliminado del carrito correctamente")
  });
})

// Pasar articulos a pedidos pendientes
app.post("/pedidos/agregar", seguridad.validarToken, (pedido, respuesta) => {
  MySQL.conexion.query(`INSERT INTO pedido (id_usuario, id_articulo, Cantidad, Talla) SELECT id_usuario, id_articulo, Cantidad, Talla FROM carrito WHERE id_usuario = ${pedido.body.id} `, (error, resultado) => {
    if (error) throw error
    respuesta.send("Se agrego a productos pendientes")
  });
})

// Obtener los articulos de pedidos pendientes
app.get("/pedidos/ver/:id", seguridad.validarToken, (pedido, respuesta) => {
  MySQL.conexion.query(`SELECT pedido.id, pedido.id_usuario, pedido.id_articulo, pedido.Cantidad, pedido.Talla, articulos.Nombre, articulos.Precio, articulos.Portada FROM pedido INNER JOIN articulos ON pedido.id_articulo = articulos.id WHERE id_usuario =  ${pedido.params.id} `, (error, resultado) => {
    if (error) throw error
    respuesta.send(resultado)
  });
})

// DEVOLVER INFORMACION DE ESPIRACION DEL TOKEN
app.post("/tokenExpirado", (pedido, respuesta) => { 
  respuesta.send(seguridad.token_expirado(pedido.body.token))
})
// Escuchar en el puerto especificado
app.listen(port, () => {
    console.log(`Servidor Node.js escuchando en http://localhost:${port}/`);
  });