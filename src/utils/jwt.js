import jwt from 'jsonwebtoken'
export const  JWT_PRIVATE_KEY = 'palabraJwtSecreto';
import dotenv from 'dotenv'
dotenv.config();



//usuario sin datos sensibles  generar el token
const generateToken = (user) => {
    const token = jwt.sign({user}, JWT_PRIVATE_KEY, {expiresIn:'1d'})
    return token
}
//validar el token
const authToken = (req, res, next) =>{
    const authHeader = req.headers['authorization']
 
    if(!authHeader){
        return res.status(401).send({status:'error', error:'no auntenticado'})
    }

    const token = authHeader.split(' ')[1]
    jwt.verify(token, JWT_PRIVATE_KEY, ( error, credential)=>{
        if(error) return res.status(403).send({
            status:'error',
            error:'no autorizado'
        })
        req.user = credential.user
        next()

    })
}
export { generateToken, authToken} 