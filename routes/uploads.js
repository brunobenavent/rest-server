const {Router} =require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');

const { validarCampos, validarArchivoSubir } = require('../middlewares');


const router = Router();

router.post('/', validarArchivoSubir, cargarArchivo)
router.put('/:coleccion/:id',[
    check('id', 'no es un id de Mongo válido').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'] )),
    validarArchivoSubir,
    validarCampos
], actualizarImagenCloudinary) //actualizarImagen)
router.get('/:coleccion/:id', [
    check('id', 'no es un id de Mongo válido').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'] )),
    validarCampos
], mostrarImagen)




module.exports = router