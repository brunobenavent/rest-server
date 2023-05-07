const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');


const usuariosGet = (req = request, res = response) => {
    res.json ({
        msg: "get API - controlador"
    })
}

const usuariosPost = async (req, res) => {


    const {nombre, correo, password, rol} = req.body
    const usuario = new Usuario({nombre, correo, password, rol})
    
    //verificar si el correo existe
    const existeEmail = await Usuario.findOne({correo})
    if(existeEmail){
        return res.status(400).json({
            msg:'el correo ya está registrado'
        })
    }


    // hasear la password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)


    // Guardar en DB
    await usuario.save()
    res.json ({
        usuario
    })

}
const usuariosPut = (req, res = response) => {

    const { id } = req.params;
    const parametros = req.query
    res.json({
        msg: 'put API - usuariosPut',
        id,
        nombre: parametros.nombre,
        estado:parametros.estado
    });
}
const usuariosPatch = (req, res = response) => {
    res.json ({
        msg: "patch API - controlador"
    })
}
const usuariosDelete = (req, res = response) => {
    res.json ({
        msg: "Delete API - controlador"
    })
}






module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}