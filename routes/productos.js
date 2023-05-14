const {Router} =require('express');
const { check } = require('express-validator');
const {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
     } = require('../controllers/productos');
const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');


const router = Router();

// Obtener todos Los productos - público
router.get('/', obtenerProductos)

// Obtener un producto por id - público
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], obtenerProducto)


// Crear producto - privado - cualquier persona con un token válido
router.post('/', [
    
],[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo válido').isMongoId(),
    check('categoria').custom( existeCategoriaPorId ),
    validarCampos

], crearProducto)

// Actualizar un producto por id - privado - cualquier persona con un token válido
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
],actualizarProducto)

// Borrar un producto por id - privado - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
],borrarProducto)




module.exports = router