const { response } = require("express");
const Usuario = require("../models/usuario");
const bcriptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");


const login = async( req, res = response )=>{

    const {correo, password} = req.body

    try {


        //verificar si el correo existe usuario
        const usuario = await Usuario.findOne({correo})

        if(!usuario) return res.status(400).json({
            msg: `El Usuario / Password no son correctos - correo`
        })


        // verificar si el usuario esta activo en la db
        if (!usuario.estado) return res.status(400).json({
            msg: `El Usuario / Password no son correctos - estado: false`
        })

        //verificar la contraseña
        const validPassword = bcriptjs.compareSync(password, usuario.password)
        if (!validPassword) return res.status(400).json({
            msg: `El Usuario / Password no son correctos - Password`
        })

        //Generar el JWT
        const token = await generarJWT(usuario.id)

        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log (error)
        return res.status(500).json({
            msg: "Algo salió mal"
        })
    }

}





module.exports = {
    login
}