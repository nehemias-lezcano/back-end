import { Router } from 'express';
import { generateToken } from "../utils/jwt.js"

class SessionsController {
  
    login = (req,res)=>{
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
        console.log(req.body.email,'controller');
     }
   
     register = async (req,res)=>{
        const {username,first_name, last_name, email,password} = req.body
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
    }
}
    


export default new SessionsController()
