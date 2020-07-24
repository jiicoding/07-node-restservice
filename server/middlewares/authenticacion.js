const jwt = require('jsonwebtoken');

//=======================
// Verificar token
//=======================

let verificaToken = (req, res, next) =>{
    let token = req.get('token');
    jwt.verify(token, process.env.SEED, (err, decoded)=>{
        if (err){
            return res.status(401).json({
                ok:false,
                err
            })
        }
        req.usuario = decoded.usuario; 
        next();
    })
    
};


//=======================
// Verificar token Imagen
//=======================

let verificaTokenImg = (req, res, next) =>{
    let token = req.query.token;

    jwt.verify(token, process.env.SEED, (err, decoded)=>{
        if (err){
            return res.status(401).json({
                ok:false,
                err
            })
        }
        req.usuario = decoded.usuario;
        next();
    })
    
};
//=======================
// Verificar AdminRole
//=======================

let verificaAdmin_Role = (req, res, next) =>{

    let usuario = req.usuario;
    
    if(usuario.role != 'ADMIN_ROLE'){
        
        return res.status(401).json({
            ok:false,
            err: {
                message: 'El usuario no tiene permisos para realizar esta opción'
            }
        })
        
        
    }
    next();
};

module.exports = {
    verificaToken,
    verificaAdmin_Role,
    verificaTokenImg
                                                                                 
}