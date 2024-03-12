// HASING
const bcrypt = require('bcrypt')
const { log } = require('console')
const ciclos = 10
const salt = bcrypt.genSaltSync(ciclos)

// ENCRIPTADO
const cryto = require('crypto')
const algoritmo = 'aes-128-gcm'
const pass = 'pass 16 caracter'
const iv = cryto.randomBytes(16)

// TOKEN
const jwt = require('jsonwebtoken')
const claveSecreta = 'esta_es_una_clave_para_token'

// FUNCION PARA EL ENCRIPTADO
function encriptado(email)
{
    // crear un objeto de cifrado
    const cifrado = cryto.createCipheriv(algoritmo, pass, iv)

    // cifrar el texto plano
    let encriptado = cifrado.update(email, 'utf8', 'hex')
    encriptado += cifrado.final('hex')

    return encriptado
}

// FUNCION PARA EL HASING
function hash(pass)
{
    // Hacer hashing
    const claveConHash = bcrypt.hashSync(pass, salt)

    return claveConHash
}

function crearToken(user_id, email)
{
    // Almacenar esa informacion en un objeto
    const carga = {
        usuario_id: user_id,
        usuario: email
    }

    // Generar el JWT
    const token = jwt.sign(carga, claveSecreta, {expiresIn: '1h'})
    return token
}

function validarToken(req, res, next)
{
    // Obtener el token del encabezado de la autorizacion
    const token = req.headers.authorization;

    // Validar y decodificar el token
    try
    {
        const decodificado = jwt.verify(token.split(' ')[1], claveSecreta)
        req.user = decodificado
        next()
    }
    catch(error)
    {
        return res.status(401).send("Token de autenticacion invalido")
    }
}

function token_expirado(token)
{
    // Decodificar el token para obtener su carga útil (payload)
    const decodedToken = jwt.decode(token);

    // Obtener el tiempo de expiración del token (exp)
    const tiempoExpiracion = decodedToken.exp;

    // Obtener el tiempo actual en segundos
    const tiempoActual = Math.floor(Date.now() / 1000);

    let expiracion_token = ""

    // Verificar si el tiempo de expiración ha pasado
    if (tiempoActual > tiempoExpiracion) {
        expiracion_token = ""
    } else {
        expiracion_token = "activo"
    }

    return expiracion_token
}

module.exports = { crearToken, validarToken, token_expirado, hash, encriptado }