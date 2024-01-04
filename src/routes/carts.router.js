import { Router } from "express";
//import CartManager from "../managerDaos/cartsManager.js";
import cartModel from "../dao/mongo/model/cart.model.js";
import { paginateSubDocs } from "mongoose-paginate-v2";
import pkg from 'mongoose';
const {uuidv4} = pkg;

const routerCar = Router();

routerCar.get('/',async(req,res)=>{
    try{
    let carts = await cartModel.find({})
    res.send(carts)
    
}catch(error){
    console.log(error);
}
})



routerCar.get('/:cid', async(req,res)=>{
    try{
    let { cid } = req.params
    let cart = await cartModel.findOne({ _id:cid })
    
    if(!cart){
      return res.status(404).send({status :' error', message:'Not found'})
    }
    const cartObject = cart.toObject(); // Convertir a objeto plano
    const products = cartObject.products;

    res.render('carts', { cart: cartObject })

    
    console.log(cart._id)
    console.log(cart.products[0].quantity)
    console.log(cart.products[0]._id)

}catch(error){
    console.log(error);
}
})



routerCar.post('/',async(req,res) =>{
    try{
    let cart = {
        products:[]
        
    }
    let respuesta =await cartModel.create({})
    res.send('Cart')
}catch(error){
    console.log(error);
}
})


routerCar.post('/:cid/product/:pid', async (req, res)=>{
    try{
        const { cid, pid } = req.params
        const {quantity} = req.body
       /*  const product ={
            id: pid,
            quantity
        } */

        //si existe el producto
      const respUpdate = await cartModel.findOneAndUpdate(
        {_id :cid, 'products.product': pid},
        {$inc: {'products.$.quantity': quantity}},
        {new: true}
      )  
      if(respUpdate){
    }

    //si no existe el producto
    await cartModel.findByIdAndUpdate(
        {_id:cid},
        {$push : {products: { product:pid, quantity }}},
        {new:true, upsert:true}
        )
        
        res.send('Insert Product')

    }catch(error){
        console.log(error);
    }
})


routerCar.delete('/:cid/product/:pid',async(req,res)=>{
    try{

        let respuesta = await cartModel.findOneAndUpdate(
            {_id: cid},
            {$pull : {products:{product : pid }}},
            {new: true}
        )
        res.send('empty cart')
    }catch(error){
        console.log(error);
    }
})

routerCar.delete('/cid', async(req,res)=> {
    try{

        let respuesta = await cartModel.findOneAndUpdate(
            {_id: cid},
            {$set : {products:[]}},
            {new: true}
        )
        res.send('empty cart')
    }catch(error){
        console.log(error);
    }
})

routerCar.post('/:cid/purcharse',async(req,res)=>{
    const { cid } = req.params
    const cart = await cartService.getCart(cid)

    //validacion que exista el cart
    //if(!cart)return

    const productNoComprado=[]
    for(const item in cart.products){
        const product = item.product
        const quantity = item.quantity
        const stock = item.product.stock

        if(quantity > stock){
            productNoComprado.push(product)
        }else{
            const respuesta = productService.updateProduct(product,{quantity: stock - quantity})
        }
    }
//crear el ticket con los datos de la compra
const ticket = await ticketService.createTicket({
    user:req.user._id,
    code:uuidv4(),
    amount:cart.products.filter(product =>!productNoComprado.includes(item.product._id)).reduce(),
    purcharser: req.user.email,
})
 if(productNoComprado.length > 0){
    cart.products.filter(product =>!productNoComprado.includes(item.product._id))
 }else{
    await cartService.delet(cid)
 }
    res.send ({
        status:'success'
    })
})



//aca empieza usando el cart manager
/* const carts = new CartManager

routerCar.get ('/', async (req,res)=>{
    try{
    const result = await carts.getCarts()
    res.send(result)
}catch(error){
return new Error (error)
}
})

routerCar.get('/:cid', async (req,res)=>{
    try{
        const { cid } = req.params
    
        const result = await carts.getCartById(cid)
  
        console.log(JSON.stringify(result,null, 2))

    return res.status(200).send(result)

}catch(error){
return new Error (error)
}
})

routerCar.post('/', async (req, res) => {
    try{
        const { products } = req.body  

        const newCart = await carts.addCart({ products })
       
        res.status(200).send(newCart);
}catch(error){
    res.status(500).send({ error: error.message });
}
})


routerCar.post('/:cid/product/:pid', async (req,res)=>{
    try{
        let { cid, pid } = req.params
        const {quantity} = req.body

        const product = {
            pid,
            quantity
        }
        
    const result = await carts.addProductInCart(cid, product)
    return res.status(200).send(result)
}catch(error){
return new Error (error)
}
})

routerCar.delete('/:cid', async (req, res) => {
    try {
        let { cid } = req.params
      
      let result = await carts.deleteCart({_id: cid})
          
       res.send({status: 'success', payload: result})
        
    } catch (error) {
        console.log(error)
    }
}) */

/* 
routerCar.get('/:cid', async (req, res) => {
    const { cid } = req.params
    try {
        const valueReturned = await carts.getCartById(cid)
        if (valueReturned.error) return res.status(200).send({ status: 'No carts found', valueReturned })

        res.status(200).send({ status: 'Carts', valueReturned })
        console.log(valueReturned);
    }
    catch (err) {
        res.status(400).send({ status: 'error router', err })
    }

});

routerCar.post('/', async (req, res) => {
    try {
        // Obtenemos el body
        const cart = req.body
        console.log(cart)
        // Comprobamos que todos los campos estén completos
        const campoVacio = Object.values(cart).find(value => value === '')
        //console.log(campoVacio);
        if (campoVacio) {
            return res.status(400).send({ status: "error", message: " Error Complete all " })
        }

        // Si addProduct devuelve un objeto con la propiedad error quiere decir que hay un error
        if (cart.status === 'error') return res.status(400).send({ valueReturned })
        await carts.addCart(cart)
        res.status(200).send({ cart })
    }
    catch (err) {
        console.log(err);
    }

});

routerCar.post('/:cid/products/:pid', async (req, res) => {
    try {   
        let { producto } = req.body
        const { cid, pid } = req.params
        console.log(cid);
        producto['id'] = Number(pid)

        const carrito = await carts.getCartById(cid)
        if (carrito.error) return res.status(400).send({ carrito })
         console.log(carrito);
        let productoEncontrado = carrito.products.findIndex(productos => productos.id == pid)
         console.log(productoEncontrado, 'found')
         console.log(carrito.products[0]);
        if (productoEncontrado !== -1) {
            // carrito.productos[productoEncontrado]
            carrito.products[productoEncontrado].quantity = Number(carrito.products[productoEncontrado].quantity) + Number(producto.quantity)
            console.log(carrito.products);
            await carts.updateCart(cid, carrito)
            return res.status(200).send({ statusbar: 'success', message: 'added product'});
        }
        console.log(producto);
        carrito.products.push(producto)
        console.log(carrito.products);
        await carts.updateCart(cid, carrito)
        res.status(200).send({status: 'success', message: 'added product', carrito: carrito.products})
    } catch (err) {
        console.log(err);
        return res.status(400).send({ status: "error", message: 'parameter error' })
    }

}) */

export default routerCar
