const { response, request } = require("express");
const { Categoria } = require("../models");

// ObtenerCategorias - Paginado - total - Populate
const obtenerCategorias = async(req = request, res = response)=>{
    const {limite, desde} = req.query;
    const query = {estado: true}

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .populate('usuario', 'nombre')
        .limit(limite)
        .skip(desde)
        
     ])

    res.json ({
        total,
        categorias
    })
}



// ObtenerCategoria - Populate {}

const obtenerCategoria = (req = request, res = response)=>{
    
}

const crearCategoria = async(req = request, res = response
    )=>{
        const nombre = req.body.nombre.toUpperCase();
        const categoriaDB = await Categoria.findOne({nombre})
        if(categoriaDB){
            return res.status(400).json({
                msg: `La categoria ${categoriaDB} ya existe`
            })
        }
        // Generar la data
        const data = {
            nombre,
            usuario: req.usuarioAutenticado._id

        }
        const categoria = new Categoria(data)
        await categoria.save()
        res.json({
            msg: 'La categoría fue creada correctamente',
            categoria
        })
}

// actualizarCategoria
const actualizarCategoria = (req = request, res = response)=>{
    
}


// borrarCategoria - estado: false
const borrarCategoria = (req = request, res = response)=>{
    
}



module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria

}