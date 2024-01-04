import { Router } from 'express'
const router = Router()
import auth from '../middlewares/autenticacion.middlewares.js'
import userModel from '../dao/mongo/model/user.model.js'
import bcrypt from '../utils/bcryptHash.js'
import {createHash} from '../utils/bcryptHash.js'
import {isValidPassword} from '../utils/bcryptHash.js'
import passport from 'passport';
import {generateToken,authToken} from '../utils/jwt.js'
import passportCall from '../passport.jwt/passportCall.js'
import authorization from '../passport.jwt/authorizacionJwtRole.js'
 

//este va
  router.post('/register',async (req,res)=>{
    const {username,first_name, last_name, email,password} = req.body
    res.cookie('first_name', first_name);

    //validar si vienen vacios y caracteres especiales

    //validar si existe el mail

const existUser = await userModel.findOne({email})
if(existUser) return res.send ({status:'error', message:'el mail ya esta registrado'})

const newUser = {
    username,
    first_name,
    last_name,
    email,
    password: createHash(password)

}
let {resultUser} = await userModel.create(newUser)

    res.status(200).send({
        status:'succes',
        message:'Usuario creado correctamente',
    })
   console.log(newUser);
})  
 

router.get ('/faillogin', async (req, res)=>{
    console.log('Fallo estrategia')
    res.send({status:'error', error:'fallo autenticacion'})
    })


router.get ('/failregister', async (req, res)=>{
     console.log('Fallo estrategia')
     res.send({status:'error', error:'fallo autenticacion'})
     })

/// github

router.get('/github', passport.authenticate('github', {scope: ['user:email']}), ()=>{})
 router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/api/session/login'}), async (req, res)=>{
    req.session.user = req.user
    res.redirect('/api/products')
 })

 


///este va
  router.post('/login',async(req,res)=>{
    const{email,password} = req.body
    const first_name = req.cookies.first_name;
    console.log(first_name,'NOMBRE');
    
    const access_token = generateToken({
       email:req.body.email,
        role:'user',
    })
    res.cookie('coderCookieToken', access_token,{
       maxAge: 60*60*100,
       httpOnly:true
     })
    .send({
        status:'success',
        message:'login success',
        access_token,
       
        })
    console.log(req.body.email,'session');
 })    


 router.get ('/products',(req,res)=>{
    res.send(req.user)
 })



router.get('/logout', (req, res)=>{
    req.session.destroy (err =>{
         if(err){
             return res.send({status:'error, error:err'})
            }
            res.send('logout ok')
        })
})

router.get('/counter',(req,res)=>{
    if(req.session.counter){
     req.session.counter ++
     res.send(`se ha visitado el sitio ${req.session.counter} veces.`)
    }else{
         req.session.counter =1
         res.send('Bienvenido')
    }
})

router.get('/privada',auth,(req,res) =>{
    res.send ('Todo lo que esta aca solo lo puede ver un admin logueado')
})
export default router