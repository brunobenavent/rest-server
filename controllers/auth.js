const { response, request } = require("express");
const Usuario = require("../models/usuario");
const bcriptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");


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

const googleSignIn = async (req = request, res = response)=>{
    const { id_token } = req.body;

    try {

        const {nombre, img, correo} = await googleVerify(id_token)
        let usuario = await Usuario.findOne({correo})
        if(!usuario){
            const data = {
                nombre,
                correo,
                password:':P',
                img,
                google: true,
                rol: 'USER_ROLE'
            }
            usuario =  new Usuario(data)
            await usuario.save()
        }

        //Si el usuario en DB
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'hable con el administrador - usuario bloqueado'
            })
        }

        //generar el JWT
        const token = await generarJWT(usuario.id)

        res.json({
           usuario,
           token
        })
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            ok: false,
            msg: "El token no se pudo verificar"
        })
        
    }




}





module.exports = {
    login,
    googleSignIn
}