const {Router} =require('express');
const { check } = require('express-validator');
const {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
     } = require('../controllers/categorias');
const { existeCategoria } = require('../helpers/db-validators');
const { validarJWT, validarCampos } = require('../middlewares');


const router = Router();

// Obtener todas las categorías - público
router.get('/', obtenerCategorias)

// Obtener una categoría por id - público
router.get('/:id', [
    check('id').custom( existeCategoria )
], obtenerCategoria)


// Crear categoría - privado - cualquier persona con un token válido
router.post('/', [
    
],[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos

], crearCategoria)

// Actualizar una categoría por id - privado - cualquier persona con un token válido
router.put('/:id', [
    
],actualizarCategoria)

// Actualizar una categoría por id - privado - Admin
router.delete('/:id', [
    
],borrarCategoria)




module.exports = router