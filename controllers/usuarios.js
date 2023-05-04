const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {
    res.json ({
        msg: "get API - controlador"
    })
}

const usuariosPost = (req, res) => {
    

    res.json ({
        msg: "post API - controlador",
        body: {nombre} =req.body    
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