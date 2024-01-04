import express from 'express'// se trae el modulo express
import session from 'express-session'
import cookieParser from 'cookie-parser'  
import uploader from '../src/utils/multer.utils.js'
import UserRouter from'./routes/users.router.js'
import productRouter from'./routes/products.router.js'
import routerCar from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'
import {fileURLToPath} from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import routerServer from './routes/index.js'
import mongoose from 'mongoose'
import  connectDb  from './config/configServer.js'
import connect from 'mongoose';
import pruebasRouter  from './routes/pruebas.router.js'
import sessionRouter from './routes/session.router.js'
import RouterClass from './routes/RouterClass.js'

import contactsRouter from './routes/contacts.router.js'
//-------------------------------------------------------
import  FileStore  from 'session-file-store'
import create from 'connect-mongo'
//----------------------------------------------------------------
import { Server } from 'socket.io';
import socketChat from './utils/socketChat.js';
import socketProducts from './utils/socketProducts.js';
const app = express()

import cors from 'cors'

const PORT = process.env.PORT
const httpServer = app.listen(PORT,()=>{
    console.log(`Escuchando en el puerto: ${PORT}`)
})

connectDb()//instrancia de nuestra base de datos
connectDb();
connectDb();
const io = new Server(httpServer)

//---------------------------------------------------

//hbs-------------------------------------------------------------------------------
import path from 'path';
import handlebars from 'express-handlebars'
app.engine('handlebars', handlebars.engine())// inicializamos el motor de plantillas
app.set('views',path.join( __dirname+'/views')) //adonde va a buscar las carpetas
app.set('view engine', 'handlebars')//para que use el motor de plantilla

//hbs---------------------------------------------------------------------------------
//passport
//import { initPassport, initPassportGithub} from './config/passport.config.js'
import initPassport from './passport.jwt/passport.config.js'
import passport from 'passport'
import passportCall from 'passport'
import jwt  from 'jsonwebtoken'
//import newUserRouter from './routes/newUser.router.js'


app.use(express.json()) // body-parser
app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use('/static', express.static(__dirname+'/public'))
app.use(cookieParser('P@l@braS3cr3t0'))

//const fileStore = FileStore(session)

//mid de terceros 1
   app.use(session({
    secret:'secretCoder',
    resave:true,
    saveUninitialized:true
}))  


/*app.use(session({
    store: new fileStore ({
        ttl: 100000*60,//tiempo de duracion
         path:'./session',
         retries: 0
    }),
    secret:'secretCoder',
    resave: true,
    saveUninitialized:true
}))  */
 

//mongo  no va con jwt
 /* app.use(session({
     store: new create ({
       mongoUrl:'mongodb://localhost:27017/comision39750',
       mongoOptions:{
          useNewUrlParser: true,
          useUnifiedTopology:true
       },
        ttl:10
    }), 
    secret:'secretCoder',
    resave: true,
    saveUninitialized:true
}))  */

initPassport()
//initPassportGithub() 
passport.use(passport.initialize())
//passport.use(passport.session())


//app.use('/register', viewsRouter)
 //app.use('/login', viewsRouter)
//app.use('/chat', viewsRouter)*/


//http://localhost:8080 /api/usuarios
//app.use('/api/usuarios',  userRouter)


//router de productos
app.use('/api/products', productRouter)

//router de carrito
app.use('/api/carts', routerCar ) 

app.use('/api/usuarios',UserRouter) 
//app.use('/pruebas', pruebasRouter)

app.use('/api/session',sessionRouter )
app.use('/api/contacts',contactsRouter)
app.use('/api/session',viewsRouter )
app.use(routerServer)

app.post('/upload', uploader.single('myFile'), (req,res)=>{
    res.send({
        status:'success',
        mensaje:'Archivo subido con exito'
    })
}) 


socketChat(io)
socketProducts(io)
   
/* socket.emit('evento-para-socket-individual','Este mensaje lo va a recibir un cliente socket')
    socket.broadcast.emit('evt-p-todo-menos-el-socket-actual','Evento que veran todos los sockets menos el actual')
    socketServer.emit('evt-para-todos','este mensaje lo reciben todos los socket conectados')
    let logs = []
    socket.on("message1", data =>{
        socketServer.emit('log',data);
    })
    //message2 se utiliza para la parte de almacenar y devolver
    socket.on("message2", data =>{
        logs.push({socketid:socket.id,message:data})
        socketServer.emit('log',{logs});
        }) */
///socketProduct(io) // ERROR socketProduct is not defined



app.use((err, req, res, next) => {
    console.log(err)
     res.status(500).send('Todo mal')
     
}) 


export default __dirname