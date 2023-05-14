const { response, request } = require("express");
const { Producto } = require("../models");

// ObtenerProductos - Paginado - total - Populate
const obtenerProductos = async(req = request, res = response)=>{
    const {limite, desde} = req.query;
    const query = {estado: true}

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')
        .limit(limite)
        .skip(desde)
        
     ])

    res.json ({
        total,
        productos
    })
}
// ObtenerProducto - Populate {}

const obtenerProducto = async (req = request, res = response)=>{
    const {id} = req.params;
    const producto = await Producto.findById(id)
                                   .populate('usuario', 'nombre')
                                   .populate('categoria', 'nombre')
    res.json(producto)
}

const crearProducto = async( req = request, res = response )=>{
        const { estado, usuario, ...body} = req.body


        const productoDB = await Producto.findOne({nombre: body.nombre})
        if(productoDB){
            return res.status(400).json({
                msg: `El producto ${productoDB} ya existe`
            })
        }
        // Generar la data
        const data = {
            nombre:body.nombre.toUpperCase(),
            categoria: body.categoria,
            usuario: req.usuarioAutenticado._id

        }
        const producto = new Producto(data)
        await producto.save()
        console.log(producto.categoria)
        res.json({
            msg: 'El producto fue creado correctamente',
            producto
        })
}

// actualizarProducto
const actualizarProducto = async (req = request, res = response)=>{

    const { id } = req.params
    const { estado, usuario, ...data} = req.body

    if(data.nombre){
        
        data.nombre = data.nombre.toUpperCase()
    }

    data.usuario = req.usuarioAutenticado._id

    const producto = await Producto.findByIdAndUpdate(id, data, {new:true}).populate('usuario', 'nombre')
    res.json(producto)
}


// borrarProducto - estado: false
const borrarProducto = async(req = request, res = response)=>{
    const { id } = req.params;
    const productoBorrado = await Producto.findByIdAndUpdate(id, {estado:false}, {new:true})

    res.json(productoBorrado)
}



module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto

}