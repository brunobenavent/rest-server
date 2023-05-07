const {Router} =require('express');
const { check } = require('express-validator');
const role = require('../models/role');
const { validarCampos } = require('../middlewares/validar-campos');
const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
} = require('../controllers/usuarios');



const router = Router();

router.get('/', usuariosGet )
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y contener almenos 6 carácteres').isLength({min:6}),
    check('correo', 'el correo no es válido').isEmail(),
    //heck('rol', 'No es un rol permitido').isIn(['ADMIN_ROL', 'USER_ROLE']),
    check("rol").custom(async(rol ='') =>{
        const existeRol = await role.findOne({rol})
        if(!existeRol){
            throw new Error (`El rol ${rol} no está registrado en la base de datos`)
        }
    }),
    validarCampos
], usuariosPost )
router.put('/:id', usuariosPut )
router.patch('/', usuariosPatch)
router.delete('/', usuariosDelete )



module.exports = router;