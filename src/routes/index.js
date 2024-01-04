import { Router } from 'express'
const router = Router()
// import { viewsRouter } from './views.router'

import productRouter from './products.router.js'
import routerCar from './carts.router.js'
import usersRouter from './users.router.js'
import sessionsRouter from './session.router.js'
import pruebasRouter  from '../routes/pruebas.router.js'
import uploader from '../utils/multer.utils.js'
import contactsRouter from '../routes/contacts.router.js'
// //router de carrito

router.use('/session',sessionsRouter)

router.use('/pruebas', pruebasRouter)
router.use ('/api/contacts', contactsRouter )
router.use('/api/carts', routerCar)

router.use('/api/products', productRouter)

router.use('/api/usuarios', usersRouter)

router.post('/upload', uploader.single('myFile'),(req,res)=>{
    res.send({
        status:'success',
        mensaje:'Archivo subido con exito'
    })
}) 


// router.use('/',(req,res)=>{
    //     res.send('Hola mundo')
    // })
    
    
    // router.use('/', viewsRouter)
    // router.use('/register', viewsRouter)
    // app.use('/chat', viewsRouter)
    // //router de productos
    export default router