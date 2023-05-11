const {Router} =require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');






const router = Router();

// Obtener todas las categorías - público
router.get('/', (req, res)=>{
    res.json('get')
})

// Obtener una categoría por id - público
router.get('/:id', (req, res)=>{
    res.json('get')
})


// Crear categoría - privado - cualquier persona con un token válido
router.post('/', (req, res)=>{
    res.json('post')
})

// Actualizar una categoría por id - privado - cualquier persona con un token válido
router.put('/:id', (req, res)=>{
    res.json('put')
})

// Actualizar una categoría por id - privado - Admin
router.delete('/:id', (req, res)=>{
    res.json('delete')
})




module.exports = router