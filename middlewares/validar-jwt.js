const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


const validarJWT = async(req = request, res = response, next) =>{
    const token = req.header('x-token')
    if(!token ) return res.status(401).json({
        msg: "No hay token en la peticion"
    })

    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        const usuarioAutenticado = await Usuario.findById(uid)
        if (!usuarioAutenticado) return res.status(401).json({msg: "token no válido - el usuario no existe en la DB"})

        // Verificar si el uid tiene el estado en true

        if(!usuarioAutenticado.estado) return res.status(401).json({msg: "token no válido - usuario con estado false"})



        req.usuarioAutenticado = usuarioAutenticado

        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: "token no válido"
        })
    }

}






module.exports = {
    validarJWT
}