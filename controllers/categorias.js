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

const obtenerCategoria = async (req = request, res = response)=>{
    const {id} = req.params;
    const categoria = await Categoria.findById(id)
                                     .populate('usuario', 'nombre')
    res.json(categoria)
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
const actualizarCategoria = async (req = request, res = response)=>{

    const { id } = req.params
    const { estado, usuario, ...data} = req.body
    data.nombre = data.nombre.toUpperCase()
    data.usuario = req.usuarioAutenticado._id

    const categoria = await Categoria.findByIdAndUpdate(id, data, {new:true}).populate('usuario', 'nombre')
    res.json(categoria)
}


// borrarCategoria - estado: false
const borrarCategoria = async(req = request, res = response)=>{
    const { id } = req.params;
    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, {estado:false}, {new:true})

    res.json(categoriaBorrada)
}



module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria

}