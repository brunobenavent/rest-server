const { response } = require("express")


const esAdminRole = (req , res = response, next) => {
   
    if(!req.usuarioAutenticado){
        return res.status(500).json({
            msg: "se quiere verificar el rol sin validar el toquen primero"
        })
    }
    const { rol, nombre } = req.usuarioAutenticado;

    if( rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg:`${nombre} no es administrador - y no puede hacer esto`
        })
    }


    next()
}

const tieneRole = (...roles)=>{
    return (req = request, res = response, next)=>{

        if(!req.usuarioAutenticado){
            return res.status(500).json({
                msg: "se quiere verificar el rol sin validar el toquen primero"
            })
        }

        const existeRole = roles.includes(req.usuarioAutenticado.rol)
        if(!existeRole) return res.status(401).json({msg: 'no tienes permiso'})



        next()
    }


    
}


module.exports = {
    esAdminRole,
    tieneRole
}