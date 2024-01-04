import { Router } from "express";
const router = Router()


router.get('/login',(req,res) => {
    res.render('login', {
        style:'index.css'
    })
})

router.get('/register',(req,res) =>{
    res.render('registerForm',{
        style:'index.css'
    })
})


let food =[
    {name:'Hamburguesa', price:150},
    {name:'Pizza', price:250},
    {name:'Papas fritas', price:100},
    {name:'Pancho', price:130},
    {name:'Lomito', price:250},
];

const users = [
    {
        nombre:'Ana',
        apellido:'Ramirez',
        edad:35,
        correo:'anar@gmail.com',
        telefono:'555-3456',
        role:'user'
    },
    {
        nombre:'Miguel',
        apellido:'Fernandez',
        edad:45,
        correo:'migue@gmail.com',
        telefono:'258-9631',
        role:'admin'
    },
    {
        nombre:'Pedro',
        apellido:'Perez',
        edad:38,
        correo:'pp@gmail.com',
        telefono:'258-7896',
        role:'user'
    },
    {
        nombre:'Carlos',
        apellido:'Benitez',
        edad:55,
        correo:'charli@gmail.com',
        telefono:'444-7788',
        role:'admin'
    },
    {
        nombre:'Mirta',
        apellido:'Sanchez',
        edad:65,
        correo:'mirta@gmail.com',
        telefono:'444-6644',
        role:'user'
    }
];

router.get('/', (req, res)=>{
    let user = users[Math.floor( Math.random() * users.length )]

    let testUser = {
        title: 'ecommerce',
        user,
        isAdmin: user.role == 'admin',
       food,
       style:'index.css'
    }

     res.render('index', testUser)
 })
 




 router.get('chat',(req,res)=>{
       res.render('layouts/chat',{})
}) 
 
router.get('/realtimeprod' , (req, res) =>{
    res.render('layouts/realtimeprod',{})
})



router.get('/register' , (req, res) =>{
    res.render('registerForm',{
        style:'index.css'
    })
})


router.post('/register',(req,res) =>{
    const {name, email, password} = req.body
    res.send({
        name,
        email, 
        password,
        mensaje:"Se registro con éxito"
    })
})


export default router
