const { response } = require("express");
const { subirArchivo } = require("../helpers");

const cargarArchivo = async(req, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).json({msg:'No hay archivos en la petición'});
        return;
    }
    if (!req.files.archivo) {
        res.status(400).json({msg:'No hay archivos en la petición'});
        return;
    }

    try {
        
        const nombre = await subirArchivo(req.files, undefined, 'imgs')
    
        res.json({
            nombre
        }) 
    } catch (msg) {
        res.status(400).json({msg})
    }




}


const actualizarImagen = async( req, res = response ) =>{

    const { id, coleccion } = req.params
    res.json({
        id,
        coleccion
    })
}

module.exports = {
    cargarArchivo,
    actualizarImagen
}