
import productManager from '../dao/productManager.js'
const productoManager = new productManager()


const socketProducts = async (io) =>{
    const products = await productoManager.getProducts()
    io.on('connection', socket =>{
        console.log('cliente conectado')

       socket.emit('productos', products)

       socket.on('addProduct', data => {
        console.log(data)
        productoManager.addProduct(data)
       })
    })
}

export default socketProducts