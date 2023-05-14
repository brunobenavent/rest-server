const { Categoria, Producto } = require('../models')
const Role = require('../models/role')
const Usuario = require('../models/usuario')


const esRolValido = async(rol ='') =>{
    const existeRol = await Role.findOne({rol})
    if(!existeRol){
        throw new Error (`El rol ${rol} no está registrado en la base de datos`)
    }
}
//verificar si el correo existe
const emailExiste = async (correo = '')=>{
    const existeEmail =  await Usuario.findOne({correo})
    if(existeEmail){
        throw new Error (`El email ${correo} ya existe en la base de datos`)
    }
} 
//verificar si el usuario existe
const existeUsuarioPorId = async (id)=>{
    const existeUsuario =  await Usuario.findById(id)
    if(!existeUsuario){
        throw new Error (`El usuario ${id} no existe en la base de datos`)
    }
} 
//verificar si la categoria existe
const existeCategoriaPorId = async (id)=>{
    const existeCategoria =  await Categoria.findById(id)
    if(!existeCategoria){
        throw new Error (`La categoría ${id} no existe en la base de datos`)
    }
} 
//verificar si el producto existe
const existeProductoPorId = async (id)=>{
    const existeproducto =  await Producto.findById(id)
    if(!existeproducto){
        throw new Error (`El producto ${id} no existe en la base de datos`)
    }
} 


module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
}