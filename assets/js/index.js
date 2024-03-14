// let link = "http://localhost:3000"
let link = "https://tauro-shop-api.onrender.com"

// FUNCIONES PARA EL HEADER

// FUNCION PARA EL BUSCADOR
let elemento_buscador = document.getElementById("buscador")
let cont_buscador = 0

function buscador()
{
    if(cont_buscador % 2 == 0)
    {
        elemento_buscador.style.display = "block"
    }
    else
    {
        elemento_buscador.style.display = "none"
    }
    cont_buscador +=1
}

let input_buscar = document.getElementById("input-buscar")

function boton_buscar() 
{
    if(input_buscar.value != "")
    {
        window.location.href = './productos.html?valor_buscador=' + input_buscar.value
    }
    else
    {
        window.location.href = "./productos.html"
    }


}

function cargar_valor_buscador()
{
    const urlParams = new URLSearchParams(window.location.search);
    const valor = urlParams.get('valor_buscador');
    input_buscar.value = valor
    lista_productos(valor, "null", "null", "null")  
    if(valor != null)
    {
        buscador()  
    }
}

// FUNCION PARA BOTON MENU
let cont_mostrar_menu = 0

function mostrar_menu()
{
    let menu_botones = document.getElementById("menu-botones")

    // let espacio_botones_cabecera_abajo = document.getElementById("espacio-botones-cabecera-abajo")

    cont_mostrar_menu += 1
    
    if(cont_mostrar_menu % 2 == 1)
    {
        menu_botones.style.display = "flex"
    }
    else
    {
        menu_botones.style.display = "none"
    }


    
}

// FUNCION PARA EL BOTONO DE CARRITO EN EL HEADER
function ir_a_carrito()
{
    let recuperar_token_usuario = localStorage.getItem("token_usuario")
    let cantidad_carrito = Number(localStorage.getItem("cantidad_carrito"))

    if(recuperar_token_usuario !== "" && cantidad_carrito !== 0)
    {
        window.location.href = "./carrito.html"
    }
    else
    {
        if(cantidad_carrito == 0)
        {
            alert("No tienes articulos, en el carrito")
        }
        else
        {
            alert("No estas registrado, ingresa con tu cuenta para entrar al carrito")
        }

    }
}

// FUNCION PARA USUARIO EN EL HEADER
function cargar_perfil()
{
    let recuperar_token_usuario = localStorage.getItem("token_usuario")
    let token_usuario = recuperar_token_usuario.split(",")

    let contenedor_botones_ingreso_registro = document.getElementById("contenedor-botones-ingreso-registro")
    let cuenta_perfil = document.getElementById("cuenta-perfil")

    let texto_usuario = document.getElementById("nombre-usuario")

    if(recuperar_token_usuario === "")
    {
        cuenta_perfil.style.display = "none"
        contenedor_botones_ingreso_registro.style.display = "flex"
    }
    else
    {
        fetch(`${link}/usuarios/datos/${token_usuario[1]}`,{
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token_usuario[0]}`
            }
        })
        .then(respuesta => respuesta.json())
        .then(data=> {

            contenedor_botones_ingreso_registro.style.display = "none"
            cuenta_perfil.style.display = "flex"
    
            let usuario = `${data[0].Nombre} ${data[0].Apellido}`
            texto_usuario.innerText = usuario
            
        })
        .catch(error => {throw new Error ("Error  en la solicitud: " + error)})
    }
}

// FUNCION PARA CERRAR SESION
function cerrar_sesion() 
{
    localStorage.setItem("token_usuario", "")
    location.reload()
}

function expiracion_sesion()
{
    let recuperar_token_usuario = localStorage.getItem("token_usuario")
    let token_usuario = recuperar_token_usuario.split(",")

    if(recuperar_token_usuario !== "")
    {
        try {
            fetch(`${link}/tokenExpirado`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token: token_usuario[0]
                })
            })
            .then(respuesta => respuesta.text())
            .then(data => {

                    if(data != "activo")
                    {
                        alert("Tu sesion expiro, ingresa de nuevo")
                        cerrar_sesion()
                    }
                
            })
            .catch(error => { throw new Error("Error en la solicitud: " + error) })
        } catch (error) {
            console.error(error)
        }
    }
}

// FUNCION PARA EL AREA DE PERFIL EN EL HEADER
function mostrar_opciones_cuenta_perfil(mostrar)
{
    let tamano = document.getElementById('opciones-cuenta-perfil')
    
    if(mostrar == "mostrar")
    {
        tamano.style.display = "block"
    }
    else
    {
        tamano.style.display = "none"
    }

}

// FUNCIONES PARA EL SLIDER

// OBTENER LOS ELEMENTOS DEL HTML Y GUARDARLOS EN UNA VARIBLE LOCAL SI ES NECESARRIO

let trans = document.getElementById("trans")

let ant = document.getElementById("anterior")
let sig = document.getElementById("siguiente")

let marcador_1 = document.getElementById("marcador-1")
let marcador_2 = document.getElementById("marcador-2")
let marcador_3 = document.getElementById("marcador-3")

let cont_posicion = 0
localStorage.setItem("cont_posicion", cont_posicion)

let segundos = 0;
localStorage.setItem("segundos", segundos)

// FUNCION PARA DEZPLAZAR A LA SIQUIENTE IMAGEN
function siguiente()
{	
    let local_cont_posicion = localStorage.getItem("cont_posicion")
    cont_posicion = parseInt(local_cont_posicion)

    if(cont_posicion > -200)
    { 
        cont_posicion += -100
        trans.style.left = `${cont_posicion}%`
        trans.style.transition = "left 1s ease"
    }

    localStorage.setItem("cont_posicion", cont_posicion)

    segundos = 0
    localStorage.setItem("segundos", segundos)

    botones_desplazamiento()
    marcadores(cont_posicion)
}

// FUNCION PARA DEZPLAZAR A LA ANTERIOR IMAGEN
function anterior()
{
    let local_cont_posicion = localStorage.getItem("cont_posicion")
    cont_posicion = parseInt(local_cont_posicion)

    if(cont_posicion < 0)
    { 
        cont_posicion -= -100

        trans.style.left = `${cont_posicion}%`
        trans.style.transition = "left 1s ease"
    }
    
    localStorage.setItem("cont_posicion", cont_posicion)

    segundos = 0
    localStorage.setItem("segundos", segundos)

    botones_desplazamiento()
    marcadores(cont_posicion)
}

// FUNCIONES PARA DEZPLAZAR AUTOMATICAMENTE A LA SIQUIENTE IMAGEN
function automatico()
{

    let local_segundos = localStorage.getItem("segundos")
    segundos = parseInt(local_segundos)

    segundos += 1

    if(segundos == 5)
    {
        siguiente()
        segundos = 0
    }

    localStorage.setItem("segundos", segundos)
}

function desplazamiento()
{
    setInterval(automatico, 1000)
}

// FUNCION PARA QUE LOS BOTONES  DE DEZPLAZAMIENTO APAREZCAN O DESAPAREZCAN SEGUN SEA NECESARIO
function botones_desplazamiento()
{
    let local_cont_posicion = localStorage.getItem("cont_posicion")
    cont_posicion = parseInt(local_cont_posicion)

    if(cont_posicion == -200)
    { 
        sig.style.display ="none"
    }

    if(cont_posicion == 0)
    { 
        ant.style.display ="none"
    }

    if(cont_posicion > -200)
    { 
        sig.style.display ="block"
    }

    if(cont_posicion < 0)
    { 
        ant.style.display ="block"
    }		
    
    localStorage.setItem("cont_posicion", cont_posicion)
}

// FUNCION PARA LOS MARCADORES
function marcadores(cont_posicion)
{
    marcador_1.style.backgroundColor = "rgba(34, 91, 166, 0.5)"
    marcador_2.style.backgroundColor = "rgba(34, 91, 166, 0.5)"
    marcador_3.style.backgroundColor = "rgba(34, 91, 166, 0.5)"  

    marcador_1.style.height = "12px"
    marcador_2.style.height = "12px"
    marcador_3.style.height = "12px"

    if(cont_posicion == 0)
    {
        marcador_1.style.backgroundColor = "rgb(34, 91, 166)"
        marcador_1.style.height = "14px"
    }

    if(cont_posicion == -100)
    {
        marcador_2.style.backgroundColor = "rgb(34, 91, 166)"
        marcador_2.style.height = "14px"
    }

    if(cont_posicion == -200)
    {
        marcador_3.style.backgroundColor = "rgb(34, 91, 166)"
        marcador_3.style.height = "14px"
    }
}

//FUNCION PARA PRODUCTOS DESTACADOS
function productos_destacados()
{
    fetch(`${link}/articulos`)
    .then(respuesta => respuesta.json())
    .then(salida => {
        
        let productos_destacados = document.getElementById("productos-destacados")
        let articulos = [1, 2, 3]

        for(let elemento of articulos)
        {
            let contenedor_articulo = document.createElement("div")
            contenedor_articulo.setAttribute('class', 'contenedor-productos-destacados')
            contenedor_articulo.setAttribute('onclick', `ver_producto(${salida[elemento].id})`)
    
            let imagen = document.createElement("img")
            imagen.setAttribute('src', `${salida[elemento].Portada}`)
            imagen.setAttribute('alt', `imagen ${salida[elemento].Nombre}`)
            imagen.setAttribute('class', 'imagen-productos-destacados')

            let espacio_puntuacion_precio = document.createElement('div')
            espacio_puntuacion_precio.setAttribute('class', 'espacio-puntuacion-precio')

            let contenedor_puntuacion = document.createElement("div")
            contenedor_puntuacion.setAttribute('class', 'contenedor-puntuacion')
            let puntuacion = salida[elemento].Puntuacion

            for(let i = 0; i<5; i++)
            {
                let estrella = document.createElement("img")
                estrella.setAttribute('alt', `estrella`)
                estrella.setAttribute('class', `estrella`)

                if(i < puntuacion)
                {
                    estrella.setAttribute('src', "assets/img/silueta-de-estrella-amarilla.png")
                }
                else
                {
                    estrella.setAttribute('src', "assets/img/silueta-de-estrella-oscura.png")
                }

                contenedor_puntuacion.appendChild(estrella)
            }
            
            let precio = document.createElement("h3")
            precio.innerText = `$${salida[elemento].Precio}`
            precio.setAttribute("class", 'titulo-producto')
            
            let titulo = document.createElement("h2")
            titulo.innerText = salida[elemento].Nombre

            let contenedor_descripcion = document.createElement('div')
            contenedor_descripcion.setAttribute('class', 'contenedor-descripcion')
            let descripcion = document.createElement("h4")
            descripcion.innerText = salida[elemento].Descripcion

            let resena = document.createElement("h5")
            resena.innerText = `Vistas(${salida[elemento].Cometarios})`

            contenedor_articulo.appendChild(imagen)
            espacio_puntuacion_precio.appendChild(contenedor_puntuacion)
            espacio_puntuacion_precio.appendChild(precio)
            contenedor_articulo.appendChild(espacio_puntuacion_precio)
            contenedor_articulo.appendChild(titulo)
            contenedor_descripcion.appendChild(descripcion)
            contenedor_articulo.appendChild(contenedor_descripcion)
            contenedor_articulo.appendChild(resena)            

            productos_destacados.appendChild(contenedor_articulo)
        }

        let carga = document.getElementById("carga")
        carga.style.display = "none"

    }).catch(error => console.error(error))
}

// FUNCIONES PARA LA PAGINA DE PRODUCTOS

// FUNCIONES PARA MOSTRAR LOS FILTROS
let masculino = document.getElementById("masculino")
let femenino = document.getElementById("femenino")
let menos_genero = document.getElementById("menos_genero")
let mas_genero = document.getElementById("mas_genero")

let cont_genero = 0

function genero()
{
    if(cont_genero % 2 == 1)
    {
        masculino.style.display = "flex"
        femenino.style.display = "flex"
        menos_genero.style.display = "block"
        mas_genero.style.display = "none"
    }
    else
    {
        masculino.style.display = "none"
        femenino.style.display = "none"
        menos_genero.style.display = "none"
        mas_genero.style.display = "block"
    }

    cont_genero ++
}

let elegante = document.getElementById("elegante")
let deportiva = document.getElementById("deportiva")
let fiesta = document.getElementById("fiesta")
let sexy = document.getElementById("sexy")
let menos_estilo = document.getElementById("menos_estilo")
let mas_estilo = document.getElementById("mas_estilo")

let cont_estilo = 0

function estilo()
{
    if(cont_estilo % 2 == 1)
    {
        elegante.style.display = "flex"
        deportiva.style.display = "flex"
        fiesta.style.display = "flex"
        sexy.style.display = "flex"
        menos_estilo.style.display = "block"
        mas_estilo.style.display = "none"
    }
    else
    {
        elegante.style.display = "none"
        deportiva.style.display = "none"
        fiesta.style.display = "none"
        sexy.style.display = "none"
        menos_estilo.style.display = "none"
        mas_estilo.style.display = "block"
    }

    cont_estilo += 1
}

let S = document.getElementById("S")
let M = document.getElementById("M")
let L = document.getElementById("L")
let XL = document.getElementById("XL")
let XXL = document.getElementById("XXL")
let menos_talla = document.getElementById("menos_talla")
let mas_talla = document.getElementById("mas_talla")


let cont_talla = 0

function talla()
{
    if(cont_talla % 2 == 1)
    {
        S.style.display = "flex"
        M.style.display = "flex"
        L.style.display = "flex"
        XL.style.display = "flex"
        XXL.style.display = "flex"
        menos_talla.style.display = "block"
        mas_talla.style.display = "none"
    }
    else
    {
        S.style.display = "none"
        M.style.display = "none"
        L.style.display = "none"
        XL.style.display = "none"
        XXL.style.display = "none"
        menos_talla.style.display = "none"
        mas_talla.style.display = "block"
    }

    cont_talla += 1
}

// FUNCIONES PARA APLICAR LOS FILTROS
let palomita_masculino = document.getElementById("palomita-masculino")
let cont_masculino = 0

let palomita_femenino = document.getElementById("palomita-femenino")
let cont_femenino = 0

let palomita_elegante = document.getElementById("palomita-elegante")
let cont_elegante = 0

let palomita_deportiva = document.getElementById("palomita-deportiva")
let cont_deportiva = 0

let palomita_fiesta = document.getElementById("palomita-fiesta")
let cont_fiesta = 0

let palomita_sexy = document.getElementById("palomita-sexy")
let cont_sexy = 0

function filtrar_genero(genero)
{
    palomita_masculino.style.backgroundColor = "white"
    palomita_femenino.style.backgroundColor = "white"

    switch (genero)
    {
        case 'masculino':
            if (cont_masculino % 2 == 0)
            {
                palomita_masculino.style.backgroundColor = "black"

                lista_productos('null', genero, 'null', 'null')
                
                cont_masculino = 1
                cont_femenino = 0  
            }
            else
            {
                palomita_masculino.style.backgroundColor = "white"
                
                lista_productos('null', 'off', 'null', 'null')

                cont_masculino = 0 
                cont_femenino = 0  
            }
            break

        case 'femenino':
            if (cont_femenino % 2 == 0)
            {
                palomita_femenino.style.backgroundColor = "black"

                lista_productos('null', genero, 'null', 'null')

                cont_masculino = 0 
                cont_femenino = 1
            }
            else
            {
                palomita_femenino.style.backgroundColor = "white"

                lista_productos('null', 'off', 'null', 'null')

                cont_masculino = 0 
                cont_femenino = 0  
            }
            break
    }
}



function filtrar_estilo(estilo)
{
    palomita_elegante.style.backgroundColor = "white"
    palomita_deportiva.style.backgroundColor = "white"    
    palomita_fiesta.style.backgroundColor = "white"
    palomita_sexy.style.backgroundColor = "white"

    switch (estilo)
    {
        case 'elegante':
            if (cont_elegante % 2 == 0)
            {
                palomita_elegante.style.backgroundColor = "black"

                lista_productos('null', 'null', estilo, 'null')
                
                cont_elegante = 1
                cont_deportiva = 0
                cont_fiesta = 0
                cont_sexy = 0
            }
            else
            {
                palomita_elegante.style.backgroundColor = "white"

                lista_productos('null', 'null', 'off', 'null')

                cont_elegante = 0
                cont_deportiva = 0
                cont_fiesta = 0
                cont_sexy = 0
            }
            break

        case 'deportiva':
            if (cont_deportiva % 2 == 0)
            {
                palomita_deportiva.style.backgroundColor = "black"

                lista_productos('null', 'null', estilo, 'null')
                
                cont_elegante = 0
                cont_deportiva = 1
                cont_fiesta = 0
                cont_sexy = 0
            }
            else
            {
                palomita_deportiva.style.backgroundColor = "white"

                lista_productos('null', 'null', 'off', 'null')

                cont_elegante = 0
                cont_deportiva = 0
                cont_fiesta = 0
                cont_sexy = 0
            }
            break

        case 'fiesta':
            if (cont_fiesta % 2 == 0)
            {
                palomita_fiesta.style.backgroundColor = "black"

                lista_productos('null', 'null', estilo, 'null')
                
                cont_elegante = 0
                cont_deportiva = 0
                cont_fiesta = 1
                cont_sexy = 0
            }
            else
            {
                palomita_fiesta.style.backgroundColor = "white"

                lista_productos('null', 'null', 'off', 'null')

                cont_elegante = 0
                cont_deportiva = 0
                cont_fiesta = 0
                cont_sexy = 0
            }
            break
        
        case 'sexy':
            if (cont_sexy % 2 == 0)
            {
                palomita_sexy.style.backgroundColor = "black"

                lista_productos('null', 'null', estilo, 'null')
                
                cont_elegante = 0
                cont_deportiva = 0
                cont_fiesta = 0
                cont_sexy = 1
            }
            else
            {
                palomita_sexy.style.backgroundColor = "white"

                lista_productos('null', 'null', 'off', 'null')

                cont_elegante = 0
                cont_deportiva = 0
                cont_fiesta = 0
                cont_sexy = 0
            }
            break
    }
}

let palomita_S = document.getElementById("palomita-S")
let cont_S = 0

let palomita_M = document.getElementById("palomita-M")
let cont_M = 0

let palomita_L = document.getElementById("palomita-L")
let cont_L = 0

let palomita_XL = document.getElementById("palomita-XL")
let cont_XL = 0

let palomita_XXL = document.getElementById("palomita-XXL")
let cont_XXL = 0

function filtrar_talla(talla)
{
    palomita_S.style.backgroundColor = "white"
    palomita_M.style.backgroundColor = "white"
    palomita_L.style.backgroundColor = "white"
    palomita_XL.style.backgroundColor = "white"
    palomita_XXL.style.backgroundColor = "white"

    switch (talla)
    {
        case 'S':
            if (cont_S % 2 == 0)
            {
                palomita_S.style.backgroundColor = "black"

                lista_productos('null', 'null', 'null', talla)
                
                cont_S = 1
                cont_M = 0
                cont_L = 0
                cont_XL = 0
                cont_XXL = 0
            }
            else
            {
                palomita_S.style.backgroundColor = "white"

                lista_productos('null', 'null', 'null', 'off')

                cont_S = 0
                cont_M = 0
                cont_L = 0
                cont_XL = 0
                cont_XXL = 0
            }
            break

        case 'M':
            if (cont_M % 2 == 0)
            {
                palomita_M.style.backgroundColor = "black"

                lista_productos('null', 'null', 'null', talla)
                
                cont_S = 0
                cont_M = 1
                cont_L = 0
                cont_XL = 0
                cont_XXL = 0
            }
            else
            {
                palomita_M.style.backgroundColor = "white"

                lista_productos('null', 'null', 'null', 'off')

                cont_S = 0
                cont_M = 0
                cont_L = 0
                cont_XL = 0
                cont_XXL = 0
            }
            break

        case 'L':
            if (cont_L % 2 == 0)
            {
                palomita_L.style.backgroundColor = "black"

                lista_productos('null', 'null', 'null', talla)
                
                cont_S = 0
                cont_M = 0
                cont_L = 1
                cont_XL = 0
                cont_XXL = 0
            }
            else
            {
                palomita_L.style.backgroundColor = "white"

                lista_productos('null', 'null', 'null', 'off')

                cont_S = 0
                cont_M = 0
                cont_L = 0
                cont_XL = 0
                cont_XXL = 0
            }
            break

        case 'XL':
            if (cont_XL % 2 == 0)
            {
                palomita_XL.style.backgroundColor = "black"
                
                lista_productos('null', 'null', 'null', talla)
                
                cont_S = 0
                cont_M = 0
                cont_L = 0
                cont_XL = 1
                cont_XXL = 0
            }
            else
            {
                palomita_XL.style.backgroundColor = "white"

                lista_productos('null', 'null', 'null', 'off')

                cont_S = 0
                cont_M = 0
                cont_L = 0
                cont_XL = 0
                cont_XXL = 0
            }
            break

        case 'XXL':
            if (cont_XXL % 2 == 0)
            {
                palomita_XXL.style.backgroundColor = "black"

                lista_productos('null', 'null', 'null', talla)
                
                cont_S = 0
                cont_M = 0
                cont_L = 0
                cont_XL = 0
                cont_XXL = 1
            }
            else
            {
                palomita_XXL.style.backgroundColor = "white"

                lista_productos('null', 'null', 'null', 'off')

                cont_S = 0
                cont_M = 0
                cont_L = 0
                cont_XL = 0
                cont_XXL = 0
            }
            break
    }
}

// FUNCION PARA PASAR DE LA PAGINA DE INICIO A LA PAGINA DE PRODUCTOS CON EL FILTRO APLICADO
function categorias(filtro)
{
    window.location.href = './productos.html?valor=' + filtro;
}

function cargar_productos()
{
    const urlParams = new URLSearchParams(window.location.search);
    const valor = urlParams.get('valor');
    filtrar_estilo(valor)
}

// FUNCIONES PARA AGREGAGAR ARTICCULOS AL CARRITO

function carrito(id_articulo, cantidad, talla)
{
    let recuperar_token_usuario = localStorage.getItem("token_usuario")
    let token_usuario = recuperar_token_usuario.split(",")

    if(recuperar_token_usuario === "")
    {
        alert("Ingresa con tu cuenta para poder agregar articulos a tu carrito");
    }
    else
    {
        try {
            fetch(`${link}/carrito/agregar`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token_usuario[0]}`
                },
                body: JSON.stringify({
                    id_usuario: token_usuario[1],
                    id_articulo: id_articulo,
                    cantidad: cantidad,
                    talla: talla
                })
            })
            .then(respuesta => respuesta.text())
            .then(data => {

                    alert(data)
                    numero_cantidad_carrito()
                
            })
            .catch(error => { throw new Error("Error en la solicitud: " + error) })
        } catch (error) {
            console.error(error)
        }
    }
}

function carrito_variable(id)
{
    let talla = document.getElementById('talla')
    let input_cantidad = document.getElementById('input-cantidad')

    carrito(id, Number(input_cantidad.value), talla.value)
}

let espacio_articulos_carrito = document.getElementById("espacio-articulos-carrito")

// FUNCIONES PARA LA PAGINA DE CARRITO
function listar_carrito()
{
    let recuperar_token_usuario = localStorage.getItem("token_usuario")
    let token_usuario = recuperar_token_usuario.split(",")

    let cantidad = 0
    let sub_total = 0
    let impuesto = 0
    let total = 0

    // FETCH PARA TOMAR LOS DATOS DEL DEL CARRITO DE LA API

    fetch(`${link}/carrito/ver/${token_usuario[1]}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token_usuario[0]}`
        }
    })
    .then(respuesta => respuesta.json())
    .then(data=> {

        if (data.length == 0)
        {
            espacio_articulos_carrito.innerHTML = "<h3>No hay articulos en tu carrito</h3>"
        }
        else
        {
            for(let articulo_carrito in data)
            {

                // CODIGO PARA LISTAR LOS ARTICULOS DEL CARRITO

                let articulo = data[articulo_carrito]

                let contenedor_articulo_carrito = document.createElement("div")
                contenedor_articulo_carrito.setAttribute("class", "contenedor-articulo-carrito")

                let contenedor_portada_texto = document.createElement("div")
                contenedor_portada_texto.setAttribute("class", "contenedor-portada-texto")

                let portada = document.createElement("img")
                portada.setAttribute("src", `${articulo.Portada}`)
                portada.setAttribute("class", "portada_carrito")

                let contenedor_titulo_cantidadTalla = document.createElement("div")
                contenedor_titulo_cantidadTalla.setAttribute("class", "contenedor-titulo-cantidadTalla")

                let titulo = document.createElement("h3")
                titulo.innerText = articulo.Nombre
                titulo.setAttribute("class", "titulo_carrito")

                let cantidad_talla = document.createElement("p")
                cantidad_talla.innerText = `Tall: ${articulo.Talla}, cantidad: ${articulo.Cantidad}`
                cantidad_talla.setAttribute("class", "cantidad_talla_carrito")

                let contenedor_precio_eliminar = document.createElement("div")
                contenedor_precio_eliminar.setAttribute("class", "contenedor-precio-eliminar")
                
                let precio = document.createElement("h3")
                precio.innerText = `$${articulo.Precio}`

                let eliminar = document.createElement("div")
                eliminar.innerHTML = `<svg class="eliminar_carrito" onclick="eliminar_articulo_carrito(${articulo.id})" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>`

                contenedor_portada_texto.appendChild(portada)
                contenedor_portada_texto.appendChild(contenedor_titulo_cantidadTalla)

                contenedor_titulo_cantidadTalla.appendChild(titulo)
                contenedor_titulo_cantidadTalla.appendChild(cantidad_talla)

                contenedor_precio_eliminar.appendChild(precio)
                contenedor_precio_eliminar.appendChild(eliminar)

                contenedor_articulo_carrito.appendChild(contenedor_portada_texto)
                contenedor_articulo_carrito.appendChild(contenedor_precio_eliminar)

                espacio_articulos_carrito.appendChild(contenedor_articulo_carrito)

                // CALCULAR CANTIDADES Y PRECIOS

                cantidad += articulo.Cantidad
                sub_total += articulo.Cantidad * articulo.Precio
            }
        }
        
        impuesto = sub_total * 0.18
        total = sub_total + impuesto

        // CODIGO PARA MOSTRAR EL DETALLE DEL PEDIDO(TOTAL, SUB-TOTAL E IMPUESTOS)

        let cantidad_articulos = document.getElementById("cantidad-articulos")
        let precio_sub_total = document.getElementById("precio-sub-total")
        let precio_impuesto = document.getElementById("precio-impuesto")
        let precio_total = document.getElementById("precio-total")

        const formatear_numero = new Intl.NumberFormat('en-US', {
            style: 'decimal', // Establece el estilo de formato como decimal
            minimumFractionDigits: 2, // Especificar la cantidad mínima de decimales (en este caso, 2)
            maximumFractionDigits: 2 // Especificar la cantidad máxima de decimales (en este caso, 2)
        })

        cantidad_articulos.textContent = cantidad
        precio_sub_total.textContent = `$${formatear_numero.format(sub_total)}`
        precio_impuesto.textContent = `$${formatear_numero.format(impuesto)}`
        precio_total.textContent = `$${formatear_numero.format(total)}`
        
    })
    .catch(error => {throw new Error ("Error  en la solicitud: " + error)})



    // AGREGAR FUNCION CON SU ID AL BOTON DE COMPRAR
    let compra = document.getElementById("comprar")
    compra.setAttribute("onclick", `comprar(${token_usuario[1]})`)
    
    // FETCH PARA TOMAR LOS DATOS DEL USUARIO METODO DE PAGO Y DIRECCION DE ENVIO DE LA API
    


    fetch(`${link}/usuarios/datos/${token_usuario[1]}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token_usuario[0]}`
        }
    })
    .then(respuesta => respuesta.json())
    .then(data=> {

        let direccion_envio = document.getElementById("direccion-envio")
        let metodo_pago = document.getElementById("metodo-pago")

        direccion_envio.textContent = data[0].Direccion_envio
        metodo_pago.textContent = data[0].Metodo_pago

    })
    .catch(error => {throw new Error ("Error  en la solicitud: " + error)})
}

function eliminar_articulo_carrito(id)
{
    let recuperar_token_usuario = localStorage.getItem("token_usuario")
    let token_usuario = recuperar_token_usuario.split(",")

    let completar_link = ""
    let mensaje = ""

    if(id == "todo")
    {
        completar_link = "_todo"
        id = ""
        mensaje = "Su pedido se realizó satisfactoriamente!, ahora puede darle seguimiento a tus pedidos."
    }
    else
    {
        mensaje = "Articulo eliminado del carrito correctamente"
    }

    fetch(`${link}/carrito/eliminar${completar_link}/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token_usuario[0]}`
        }
    })
    .then(respuesta => respuesta.text())
    .then(data=> {

        alert(mensaje)
        espacio_articulos_carrito.innerHTML = "" 
        listar_carrito()
        numero_cantidad_carrito()

    })
    .catch(error => {throw new Error ("Error  en la solicitud: " + error)})
}

function agregar_pedidos(id)
{
    let recuperar_token_usuario = localStorage.getItem("token_usuario")
    let token_usuario = recuperar_token_usuario.split(",")

    try {
        fetch(`${link}/pedidos/agregar`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token_usuario[0]}`
            },
            body: JSON.stringify({
                id: id
            })
        })
        .then(respuesta => respuesta.text())
        .then(data => {})
        .catch(error => { throw new Error("Error en la solicitud: " + error) })
    } catch (error) {
        console.error(error)
    }
}

function comprar(id)
{
    agregar_pedidos(id)
    eliminar_articulo_carrito("todo") 
    setTimeout(() => window.location.href = "./pedidos.html", 100)

}


function numero_cantidad_carrito()
{
    let recuperar_token_usuario = localStorage.getItem("token_usuario")
    let token_usuario = recuperar_token_usuario.split(",")

    let numero_carrito = document.getElementById("numero-carrito")

    fetch(`${link}/carrito/ver/${token_usuario[1]}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token_usuario[0]}`
        }
    })
    .then(respuesta => respuesta.json())
    .then(data=> {

        let contenedor_numero_carrito = document.getElementById("contenedor-numero-carrito")
        localStorage.setItem("cantidad_carrito", data.length)

        if(data.length != 0)
        {
            contenedor_numero_carrito.style.display = "block"
            numero_carrito.innerText = data.length
        }
        else
        {
            contenedor_numero_carrito.style.display = "none"
        }
    })
    .catch(error => {throw new Error ("Error  en la solicitud: " + error)})
}

// FUNCION PARA LA PAGINA DE PEDIDOS
function listar_pedido()
{     
    let recuperar_token_usuario = localStorage.getItem("token_usuario")
    let token_usuario = recuperar_token_usuario.split(",")
    
    fetch(`${link}/pedidos/ver/${token_usuario[1]}`,{
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token_usuario[0]}`
        }
    })
    .then(respuesta => respuesta.json())
    .then(salida=> {

        let espacio_pedidos = document.getElementById("espacio-pedidos")

        if(salida.length != 0)
        {
            for(let articulo of salida)
            {
                let contenedor_articulo = document.createElement("div")
                contenedor_articulo.setAttribute('class', 'contenedor-articulo')
                
                console.log(articulo.Portada);
        
                let imagen = document.createElement("img")
                imagen.setAttribute('src', `${articulo.Portada}`)
                imagen.setAttribute('alt', `imagen ${articulo.Nombre}`)
                imagen.setAttribute('class', 'imagen-articulo')



                let titulo = document.createElement("h2")
                titulo.innerText = articulo.Nombre

                let talla_cantidad = document.createElement("p")
                talla_cantidad.innerText = `Talla: ${articulo.Talla}, Cantidad: ${articulo.Cantidad}`
                
                let precio = document.createElement("h3")
                precio.innerText = `$${articulo.Precio}`
                precio.setAttribute("class", 'titulo-producto')

                contenedor_articulo.appendChild(imagen)
                contenedor_articulo.appendChild(titulo)
                contenedor_articulo.appendChild(talla_cantidad)
                contenedor_articulo.appendChild(precio)
        
                espacio_pedidos.appendChild(contenedor_articulo)
            }
        }
        else
        {
            espacio_pedidos.innerHTML = "<h3>No tienes ningun pedido pendiente</h3>"
        }
        
    })
    .catch(error => {throw new Error ("Error  en la solicitud: " + error)})
}

// FUNCION PARA LISTAR LOS PRODUCTOR
let espacio_lista_productos = document.getElementById("espacio-lista-productos")
let filtro = ""

let filtro_buscar = "null"
let filtro_genero = "null"
let filtro_categoria = "null"
let filtro_talla = "null"

function lista_productos(buscar, genero, categoria, talla)
{
    if(buscar == "off")
    {
        filtro_buscar = "null"
    }
    else
    {   
        if(buscar != "null")
        {
            filtro_buscar = buscar
        }
    }

    if(genero == "off")
    {
        filtro_genero = "null"
    }
    else
    {   
        if(genero != "null")
        {
            filtro_genero = genero
        }
    }
    
    if(categoria == "off")
    {
        filtro_categoria = "null"
    }
    else
    {   
        if(categoria != "null")
        {
            filtro_categoria = categoria
        }
    }

    if(talla == "off")
    {
        filtro_talla = "null"
    }
    else
    {   
        if(talla != "null")
        {
            filtro_talla = talla
        }
    }
    

    filtro = `filtro/${filtro_buscar}/${filtro_genero}/${filtro_categoria}/${filtro_talla}`

    if(filtro_buscar == "null" && filtro_genero == "null" && filtro_categoria == "null" && filtro_talla == "null")
    (
        filtro = 'articulos'
    )

    fetch(`${link}/${filtro}`)
    .then(respuesta => respuesta.json())
    .then(salida => {
        


        espacio_lista_productos.innerHTML = ""

        if(salida == "")
        {
            espacio_lista_productos.innerHTML = "<h6 id='aviso'>No hay articulos con estas especificaciones</h6>"
        }
        else
        {
            for(let objeto in salida)
            {
                let contenedor_articulo = document.createElement("div")
                contenedor_articulo.setAttribute('class', 'contenedor-articulo')
                contenedor_articulo.addEventListener('click', function(event) {
                    // Coordenadas del clic dentro
                    const x = event.clientX - contenedor_articulo.getBoundingClientRect().left;
                    const y = event.clientY - contenedor_articulo.getBoundingClientRect().top;
            
                    // Coordenadas del área donde no queremos que funcione el evento
                    const areaNoClicX = 0;
                    const areaNoClicY = 0;
                    const areaNoClicWidth = 200;
                    const areaNoClicHeight = 200;
            
                    // Verificar si el clic está dentro del área que queremos evitar
                    if (!(x >= areaNoClicX && x <= areaNoClicX + areaNoClicWidth &&
                        y >= areaNoClicY && y <= areaNoClicY + areaNoClicHeight)) 
                    {
                        window.location.href = './ver_producto.html?valor_articulo=' + salida[objeto].id;
                    }
                })

                let contenedor_emergente = document.createElement("div")
                contenedor_emergente.setAttribute('class', 'contenedor-emergente')
                contenedor_emergente.innerHTML = `<svg onclick="carrito(${(salida[objeto].id)}, 1, '${descubrir_talla(salida[objeto])}')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg> <br> <svg onclick="ver_producto(${salida[objeto].id})" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`

                let imagen = document.createElement("img")
                imagen.setAttribute('src', `${salida[objeto].Portada}`)
                imagen.setAttribute('alt', `imagen ${salida[objeto].Nombre}`)
                imagen.setAttribute('class', 'imagen-articulo')
                imagen.addEventListener('mousemove', () => { contenedor_emergente.style.display = "flex" })
                contenedor_emergente.addEventListener('mouseleave', () => { contenedor_emergente.style.display = "none" })
                
                let titulo = document.createElement("h2")
                titulo.innerText = salida[objeto].Nombre

                let contenedor_puntuacion = document.createElement("div")
                contenedor_puntuacion.setAttribute('class', 'contenedor-puntuacion')
                let puntuacion = salida[objeto].Puntuacion

                for(let i = 0; i<5; i++)
                {
                    let estrella = document.createElement("img")
                    estrella.setAttribute('alt', `estrella`)
                    estrella.setAttribute('class', `estrella`)

                    if(i < puntuacion)
                    {
                        estrella.setAttribute('src', "assets/img/silueta-de-estrella-amarilla.png")
                    }
                    else
                    {
                        estrella.setAttribute('src', "assets/img/silueta-de-estrella-oscura.png")
                    }

                    contenedor_puntuacion.appendChild(estrella)
                }
                
                let precio = document.createElement("h3")
                precio.innerText = `$${salida[objeto].Precio}`
                precio.setAttribute("class", 'titulo-producto')

                contenedor_articulo.appendChild(contenedor_emergente)
                contenedor_articulo.appendChild(imagen)
                contenedor_articulo.appendChild(titulo)
                contenedor_articulo.appendChild(contenedor_puntuacion)
                contenedor_articulo.appendChild(precio)

                espacio_lista_productos.appendChild(contenedor_articulo)
            }
        }
    }).catch(error => console.error(error))
}

// FUNCIONES PARA LA PAGINA VER_PRODUCTOS
function ver_producto(filtro)
{
    window.location.href = './ver_producto.html?valor_articulo=' + filtro;
}

function ver_producto_seleccionado()
{
    const urlParams = new URLSearchParams(window.location.search);
    const valor = urlParams.get('valor_articulo');
    ver(valor)
    localStorage.setItem("id_articulo", valor)
}

function ver(id)
{
    fetch(`${link}/articulos/${id}`)
    .then(respuesta => respuesta.json())
    .then(salida => {

        let articulo = salida[0]

        let portada = document.getElementById('portada')
        let foto1 = document.getElementById('foto1') 
        let foto2 = document.getElementById('foto2') 
        let foto3 = document.getElementById('foto3') 
        let imagen_principal = document.getElementById('imagen-principal')
        let imagen_principal_oculta = document.getElementById('imagen-principal-oculta')

        portada.style.border = "#225BA6 solid 5px"

        portada.setAttribute('src', `${articulo.Portada}`)
        foto1.setAttribute('src', `${articulo.Foto1}`)
        foto2.setAttribute('src', `${articulo.Foto2}`)
        foto3.setAttribute('src', `${articulo.Foto3}`)
        imagen_principal.setAttribute('src', `${articulo.Portada}`)
        imagen_principal_oculta.setAttribute('src', `${articulo.Portada}`)


        let titulo = document.getElementById("titulo-ver-producto")
        titulo.innerHTML = `Tauro Shop - ${articulo.Nombre}`

        let titulo_articulo = document.getElementById('titulo-articulo')
        let precio = document.getElementById('precio-articulo')
        let descripcion = document.getElementById('descripcion')
        let contenedor_puntuacion = document.getElementById('contenedor-puntuacion')
        let comentarios = document.getElementById('comentarios')
        let talla = document.getElementById('talla')
        let input_cantidad = document.getElementById('input-cantidad')

        titulo_articulo.textContent = articulo.Nombre

        for(let i = 0; i<5; i++)
        {
            let estrella = document.createElement("img")
            estrella.setAttribute('alt', `estrella`)
            estrella.setAttribute('class', `estrella`)

            if(i < articulo.Puntuacion)
            {
                estrella.setAttribute('src', "assets/img/silueta-de-estrella-amarilla.png")
            }
            else
            {
                estrella.setAttribute('src', "assets/img/silueta-de-estrella-oscura.png")
            }
     
            contenedor_puntuacion.appendChild(estrella)
        }

        comentarios.textContent = `(${articulo.Cometarios}+ comentarios)`
   
        precio.textContent = `$${articulo.Precio}`

        input_cantidad.value = 1

        if(articulo.S == "True")
        {
            let eleccion_talla = document.createElement('option')
            eleccion_talla.setAttribute("value", "S")
            eleccion_talla.innerText = "S"
            talla.appendChild(eleccion_talla)
        }

        if(articulo.M == "True")
        {
            let eleccion_talla = document.createElement('option')
            eleccion_talla.setAttribute("value", "M")
            eleccion_talla.innerText = "M"
            talla.appendChild(eleccion_talla)
        }

        if(articulo.L == "True")
        {
            let eleccion_talla = document.createElement('option')
            eleccion_talla.setAttribute("value", "L")
            eleccion_talla.innerText = "L"
            talla.appendChild(eleccion_talla)
        }

        if(articulo.XL == "True")
        {
            let eleccion_talla = document.createElement('option')
            eleccion_talla.setAttribute("value", "XL")
            eleccion_talla.innerText = "XL"
            talla.appendChild(eleccion_talla)
        }

        if(articulo.XXL == "True")
        {
            let eleccion_talla = document.createElement('option')
            eleccion_talla.setAttribute("value", "XXL")
            eleccion_talla.innerText = "XXL"
            talla.appendChild(eleccion_talla)
        }

        let boton_ver_productos = document.getElementById("boton-ver-productos")
        boton_ver_productos.setAttribute("onclick", `carrito_variable(${id})`)

        descripcion.textContent = articulo.Descripcion
        
        sugrencias()
    }).catch(error => console.error(error))
}

function descubrir_talla(articulo)
{
    let talla = ""

    if(articulo.S == "True")
    {
        talla = "S"
    }
    else
    {
        if(articulo.M == "True")
        {
            talla = "M"
        }
        else
        {
            if(articulo.L == "True")
            {
                talla = "L"
            }
            else
            {
                if(articulo.XL == "True")
                {
                    talla = "XL"
                }
                else
                {
                    if(articulo.XXL == "True")
                    {
                        talla = "XXL"
                    }
                }
            }
        }
    }

    return talla
}

let cont_cambiar_foto = 0

function cambiar_foto(direccion)
{
    fetch(`${link}/articulos/${localStorage.getItem("id_articulo")}`)
    .then(respuesta => respuesta.json())
    .then(salida => {

        let articulo = salida[0]

        let lista_imagenes = [articulo.Portada, articulo.Foto1, articulo.Foto2, articulo.Foto3]

        let portada = document.getElementById('portada')
        let foto1 = document.getElementById('foto1') 
        let foto2 = document.getElementById('foto2') 
        let foto3 = document.getElementById('foto3') 
        let imagen_principal = document.getElementById('imagen-principal')
        let imagen_principal_oculta = document.getElementById('imagen-principal-oculta')

        portada.style.border = "#d4d4d4 1.5px solid"
        foto1.style.border = "#d4d4d4 1.5px solid"
        foto2.style.border = "#d4d4d4 1.5px solid"
        foto3.style.border = "#d4d4d4 1.5px solid"

        //portada.style.border = "#225BA6 solid 5px"

        if(direccion == "derecha")
        {
            if(cont_cambiar_foto  == 3)
            {
                cont_cambiar_foto = 0
            }
            else
            {
                cont_cambiar_foto += 1
            }
        }
        else
        {
            if(cont_cambiar_foto  == 0)
            {
                cont_cambiar_foto = 3
            }
            else
            {
                cont_cambiar_foto -= 1
            }
        }

        if(cont_cambiar_foto == 0)
        {
        portada.style.border = "#225BA6 solid 5px"
        }
        
        if(cont_cambiar_foto == 1)
        {
            foto1.style.border = "#225BA6 solid 5px"
        }

        if(cont_cambiar_foto == 2)
        {
            foto2.style.border = "#225BA6 solid 5px"
        }

        if(cont_cambiar_foto == 3)
        {
            foto3.style.border = "#225BA6 solid 5px"
        }

        imagen_principal.setAttribute('src', `${lista_imagenes[cont_cambiar_foto]}`)
        imagen_principal_oculta.setAttribute('src', `${lista_imagenes[cont_cambiar_foto]}`)

    }).catch(error => console.error(error))
}

function mostrar_cambiar_imagen(posicion)
{
    let derecha = document.getElementById('derecha')
    let izquierda = document.getElementById('izquierda')

    let derecha_oculta = document.getElementById('derecha-oculta')
    let izquierda_oculta = document.getElementById('izquierda-oculta')

    if(posicion == "over")
    {
        derecha.style.display = "block"
        izquierda.style.display = "block"

        derecha_oculta.style.display = "block"
        izquierda_oculta.style.display = "block"
    }
    else
    {
        derecha.style.display = "none"
        izquierda.style.display = "none"

        derecha_oculta.style.display = "none"
        izquierda_oculta.style.display = "none"
    }
}

function sugrencias() 
{
    let espacio_lista_productos = document.getElementById('espacio-lista-productos')

    for(let i =0; i<=3; i++ )
    {
        let id = Math.floor(Math.random() * 30) + 1
        fetch(`${link}/articulos/${id}`)
        .then(respuesta => respuesta.json())
        .then(salida => {



            console.log(salida);

            let contenedor_articulo = document.createElement("div")
            contenedor_articulo.setAttribute('class', 'contenedor-articulo')
            contenedor_articulo.addEventListener('click', function(event) {
                // Coordenadas del clic dentro
                const x = event.clientX - contenedor_articulo.getBoundingClientRect().left;
                const y = event.clientY - contenedor_articulo.getBoundingClientRect().top;
        
                // Coordenadas del área donde no queremos que funcione el evento
                const areaNoClicX = 0;
                const areaNoClicY = 0;
                const areaNoClicWidth = 200;
                const areaNoClicHeight = 200;
        
                // Verificar si el clic está dentro del área que queremos evitar
                if (!(x >= areaNoClicX && x <= areaNoClicX + areaNoClicWidth &&
                    y >= areaNoClicY && y <= areaNoClicY + areaNoClicHeight)) 
                {
                    window.location.href = './ver_producto.html?valor_articulo=' + salida[0].id;
                }
            })

            let contenedor_emergente = document.createElement("div")
            contenedor_emergente.setAttribute('class', 'contenedor-emergente')
            contenedor_emergente.innerHTML = `<svg onclick="carrito(${id}, 1, '${descubrir_talla(salida[0])}')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg> <br> <svg onclick="ver_producto(${salida[0].id})" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`
            
            let imagen = document.createElement("img")
            imagen.setAttribute('src', `${salida[0].Portada}`)
            imagen.setAttribute('alt', `imagen ${salida[0].Nombre}`)
            imagen.setAttribute('class', 'imagen-articulo')
            imagen.addEventListener('mousemove', () => { contenedor_emergente.style.display = "flex" })
            contenedor_emergente.addEventListener('mouseleave', () => { contenedor_emergente.style.display = "none" })
            
            let titulo = document.createElement("h2")
            titulo.innerText = salida[0].Nombre

            let contenedor_puntuacion = document.createElement("div")
            contenedor_puntuacion.setAttribute('class', 'contenedor-puntuacion')
            let puntuacion = salida[0].Puntuacion

            for(let i = 0; i<5; i++)
            {
                let estrella = document.createElement("img")
                estrella.setAttribute('alt', `estrella`)
                estrella.setAttribute('class', `estrella`)

                if(i < puntuacion)
                {
                    estrella.setAttribute('src', "assets/img/silueta-de-estrella-amarilla.png")
                }
                else
                {
                    estrella.setAttribute('src', "assets/img/silueta-de-estrella-oscura.png")
                }

                contenedor_puntuacion.appendChild(estrella)
            }
            
            let precio = document.createElement("h3")
            precio.innerText = `$${salida[0].Precio}`
            precio.setAttribute("class", 'titulo-producto')

            contenedor_articulo.appendChild(contenedor_emergente)
            contenedor_articulo.appendChild(imagen)
            contenedor_articulo.appendChild(titulo)
            contenedor_articulo.appendChild(contenedor_puntuacion)
            contenedor_articulo.appendChild(precio)

            espacio_lista_productos.appendChild(contenedor_articulo)
            
            
        }).catch(error => console.error(error))   
    } 
}

// FUNCIONES PARA LA PAGINA DE CONTACTOS

// FUNCION PARA EL MAPA
function inicializarMapa() 
{
     var ubicacion = { lat: 18.467159968148298, lng: -69.92846294738784};

     var opcionesMapa = {
         center: ubicacion,
         zoom: 15 
     };

     var mapa = new google.maps.Map(document.getElementById('mapa'), opcionesMapa);

     var marcador = new google.maps.Marker({
         position: ubicacion,
         map: mapa,
         title: 'Ubicación Tauro Shop'
     });
}

// FUNCION PARA LA PARTE DE "ESCRIBENOS"
let input_nombre = document.getElementById("input-nombre")
let input_email = document.getElementById("input-email")
let mensaje = document.getElementById("mensaje")
let confirmacion_enviar = document.getElementById("confirmacion-envio")

function escribenos()
{
    input_nombre.value = ""
    input_email.value = ""
    mensaje.value = ""
    confirmacion_enviar.textContent  = "*Se envio correctamente*"
}


// FUNCION PARA LA PAGINA DE REGISTRO 
let nombre = document.getElementById('nombre')
let apellido = document.getElementById('apellido')
let email = document.getElementById('email')
let contraseña = document.getElementById('contraseña')
let repite_la_contraseña = document.getElementById('repite-la-contraseña')
let direccion_de_envio = document.getElementById('direccion-de-envio')
let metodo_de_pago = document.getElementById('metodo-de-pago')
let telefono = document.getElementById('telefono')


// FUNCION PARA EL BOTON DE REGISTRO Y EDITAR USUARIO
function guardar_cambios(guardar)
{
    var contraseñaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if(!(nombre.value == "" || apellido.value == "" || email.value == "" || contraseña.value == "" || direccion_de_envio.value == "" || metodo_de_pago.value == ""))
    {
        if(contraseña.value == repite_la_contraseña.value)
        {
            if (contraseña.value.match(contraseñaRegex))
            {
                if(guardar == "registro")
                    try {
                        fetch(`${link}/usuarios/registro`, {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                nombre: nombre.value,
                                apellido: apellido.value,
                                email: email.value,
                                contrasena: contraseña.value,
                                direccion_envio: direccion_de_envio.value,
                                metodo_pago: metodo_de_pago.value,
                                telefono: telefono.value
                            })
                        })
                        .then(function(){                        
                        nombre.value = ""
                        apellido.value = ""
                        email.value = ""
                        contraseña.value = ""
                        repite_la_contraseña.value = ""
                        direccion_de_envio.value = ""
                        metodo_de_pago.value = ""
                        telefono.value = ""

                        alert("Bienvenido!, ya estas registrado, ahora ingresa con tus credenciales")
                        })
                        .catch(error => { throw new Error("Error en la solicitud: " + error) })
                    } catch (error) {
                        console.error(error)
                    }
                else
                {
                    try {
                        let recuperar_token_usuario = localStorage.getItem("token_usuario")
                        let token_usuario = recuperar_token_usuario.split(",")
                        fetch(`${link}/usuarios/datos/${token_usuario[1]}`, {
                            method: 'PUT',
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token_usuario[0]}`
                            },
                            body: JSON.stringify({
                                Nombre: nombre.value,
                                Apellido: apellido.value,
                                Email: email.value,
                                Contraseña: contraseña.value,
                                Direccion_envio: direccion_de_envio.value,
                                Metodo_pago: metodo_de_pago.value,
                                Telefono: telefono.value
                            })
                        })
                        .then(function(){        

                            alert("Se actualizo correctamente")
                            window.location.href = "index.html";

                        })
                        .catch(error => { throw new Error("Error en la solicitud: " + error) })
                    } catch (error) {
                        console.error(error)
                    }
                }
            }
            else
            {
                alert("El registro no cumple con las condiciones: \n\nLa contrasena debe tener al menos una mayuscula, alguna minuscula, algun numero y un minimo de 8 caracteres\nNo cepta caracteres especiales")
            }
        }
        else
        {
            alert("La contrasena no coincide con la confirmacion")
        }
    }
    else
    {
        alert("Hay campos vacios, no dejes ningun campo vacio")
    }
}

//EVENTO PARA EL INPUT METODO DE PAGA
let cont_pago = 0

//EVENTO PARA EL INPUT METODO DE PAGA
metodo_de_pago.addEventListener("keydown", function(event)
{
    let tamano_metodo_pago = metodo_de_pago.value.length - cont_pago

    if(metodo_de_pago.value.length < 19 && (event.code.startsWith('Digit') || event.code.startsWith('Numpad')))
    {
        if(tamano_metodo_pago % 4 == 0 && tamano_metodo_pago != 0)
        {
            metodo_de_pago.value += "-"
            cont_pago+=1
        }
    }
    else
    {
        if(event.code != 'Backspace' && event.code != "Tab")
        {
            event.preventDefault();
        }
        else
        {
            if (metodo_de_pago.value.length == 16 || metodo_de_pago.value.length == 11 || metodo_de_pago.value.length == 6) 
            {
                metodo_de_pago.value = metodo_de_pago.value.slice(0, -1)
                cont_pago-=1
            }
        }
    }
})

//EVENTO PARA EL TELEFONO
telefono.addEventListener("keydown", function(event)
{
    let tamano_telefono = telefono.value.length - cont_pago

    if(telefono.value.length < 12 && (event.code.startsWith('Digit') || event.code.startsWith('Numpad')))
    {
        if((tamano_telefono == 3 || tamano_telefono == 7) && tamano_telefono != 0)
        {
            telefono.value += "-"
        }
    }
    else
    {
        if(event.code != 'Backspace' && event.code != "Tab")
        {
            event.preventDefault();
        }
        else
        {
            if (telefono.value.length == 5 || telefono.value.length == 9) 
            {
                telefono.value = telefono.value.slice(0, -1)
            }
        }
    }
})

// FUNCIONES PARA LA PAGINA DE INGRESO
function ingreso() {
    var regex = /^[a-zA-Z0-9]+$/

    if(contraseña.value.match(regex))
    {
        try {
            fetch(`${link}/usuarios/ingreso`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email.value,
                    contrasena: contraseña.value
                })
            })
            .then(respuesta => respuesta.text())
            .then(data => {



                if(data === "")
                {
                    alert("Login incorrecto");
                }
                else
                {
                    let json_data = JSON.parse(data)
                    localStorage.setItem('token_usuario', json_data)
                    window.location.href = "index.html";
                }
            })
            .catch(error => { throw new Error("Error en la solicitud: " + error) })
        } catch (error) {
            console.error(error)
        }
    }
    else
    {
        alert("No puedes ingresar caracteres especiales")
    }
}

// FUNCIONES PARA LA PAGINA DE EDITAR PERFIL
function cargar_editar_perfil() 
{
    let recuperar_token_usuario = localStorage.getItem("token_usuario")
    let token_usuario = recuperar_token_usuario.split(",")

    fetch(`${link}/usuarios/datos/${token_usuario[1]}`,{
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token_usuario[0]}`
        }
    })
    .then(respuesta => respuesta.json())
    .then(data=> {

        let datos = data[0]

        nombre.value = datos.Nombre
        apellido.value = datos.Apellido
        email.value = datos.Email
        direccion_de_envio.value = datos.Direccion_envio
        metodo_de_pago.value = datos.Metodo_pago
        telefono.value = datos.Telefono
    })
    .catch(error => {throw new Error ("Error  en la solicitud: " + error)})

}