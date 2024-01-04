import { Router } from 'express'
const router = Router()
import auth from '../middlewares/autenticacion.middlewares.js'
import {fork} from 'child_process'
//import operacionCompleja from '../utils/operacionCompleja.js'
import nodemailer from 'nodemailer'
import config from '../config/configServer.js'



router.get('/sms', async (req, res)=>{
     res.send('Email enviado')
})

const transport= nodemailer.createTransport({
     service:'gmail',
     port:587,
     auth:{
          user:config.GMAIL_USER_APP,
          pass:config.GMAIL_PASS_APP
     },
    tls: {
          rejectUnauthorized: false
        } 
})

router.get('/mail', async (req, res)=>{
     let result = await transport.sendMail({
          from:'Coder Test <anaceceiza81@gmail.com>',
          to:'anaceceiza81@gmail.com',
          subject:'Correo de prueba comision 39750',
          html:`<div>
          <h1>Esto es un test </h1>
          </div>`,
          attachments:[]
     })
     res.send('Email enviado')
})






router.get('/setCookie', (req,res)=>{//setear una cookie del lado del cliente
              //nombre del campo, valor, tiempo de vida
     res.cookie('CoderCookie',' Esta es un cookie poderosa',{maxAge: 10000000}).send('Cookie seteada')

})
router.get('/setSignedCookie', (req,res)=>{
     res.cookie('SignedCookie',' Esta es un cookie poderosa',{maxAge: 10000000, signed: true}).send('Cookie seteada')

})

router.get('/getCookie', (req,res)=>{
     res.send(req.cookies)

})
router.get('/getSignedCookie', (req,res)=>{
     res.send(req.signedCookies)

})


router.get('/deleteCookie', (req,res)=>{
      res.clearCookie('CoderCookie').send('cookie removed')

})

//ejercicio

router.get('/', (req,res)=>{
     res.render('login',{})

})
router.post('/setcookieuser', (req,res)=>{
     const {username,email} = req.body

     res.cookie(username,email,{maxAge: 10000000, signed: true}).send({mensaje:'seteado'})
})


//ejercicio 1

const nombres=['fede','juan']
router.param('nombre',(req,res,next,nombre)=>{
     if(nombres.includes(nombre)) {
     req.nombre = null
     
}else{
     req.nombre =nombre
}

next()
})

router.get('/params/:nombre([a-zA-Z]+)', (req,res)=>{
     res.send({
          message:req.nombre
     })
})
router.get('/params/:nombre([a-zA-Z]+)', (req,res)=>{
     res.send({
          message:req.params.nombre
     })
})

//manejo de rutas
router.get('*',async (req,res)=>{
     res.status(404).send('404 Not found')// en vez de sen  .render para redirijir  a pagina de not found
})
 

///ejercicio 
function operacionCompleja(){
     let result =0
    for (let i =0; i< 9e9; i++){
          result += i
    }
     return result
 
}

/* router.get('/sumacomp',(req,res)=>{
     const result = operacionCompleja()
     res.send(`el resultado de la operacion es ${result}`)
})  */


router.get('/block',(req,res)=>{
     const result = operacionCompleja()
     res.send(`el resultado de la operacion es ${result}`)
})
  
router.get('/noblock',(req,res)=>{
     const child = fork('.src/utils/operacionCompleja.js')
     child.send('Inicia el proceso de cálculo')
     child.on('message', result => {
          res.send(`el resultad de la operación es ${result}`)
     })
      
 })
          

router.get('/suma',(req,res)=>{
     //const result = operacionCompleja()
     res.send(`Hola mundo`)
     })
     



     export default router