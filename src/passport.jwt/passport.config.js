import passport from "passport";
import jwt from "passport-jwt";

const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;


const JWTStrategy=jwt.Strategy
const ExtractJWT=jwt.ExtractJwt


const cookieExtractor = req =>{
    //console.log(req);
    let token = null
    if(req && req.cookies){
        token = req.cookies['coderCookieToken']
        
    }
    return token
}
const configStrategy ={
    jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
    secretOrKey:JWT_PRIVATE_KEY 
}
    const initPassport =()=>{
        passport.use('jwt', new JWTStrategy(configStrategy, async(jwt_payload,done)=>{
            try{
           // done(null, false,{messages:'no hay usuarios'})
            return done ( null, jwt_payload)

            }catch(error){
                return done(error)
            }
        }))

}



export default initPassport    