const { validationResult } = require('express-validator');
const { productsService } = require('../service/')


class ProductController {
    
    
    getAll = async (req,res)=>{
        try{
            const errors = validationResult(req);
            //Si hay errores, devuelve un error 400 con los errores
            if (!errors.isEmpty()) {
                return res.status(400).send({message: 'Error en los parametros de entrada', errors});
            }
            
            //Si no hay errores, se ejecuta la consulta
            const {limit = 10, page = 1, priceSort = null, category = null, availability = null} = req.query
            //Se crea un objeto con los filtros
            const filter = {}
            if(category) {
                filter.category = category
            }
            if(availability) {
                filter.status = availability
            }
            //Se crea un objeto con los ordenamientos
            let sort = null
            
            if(priceSort==='asc'){
                sort = {price: 1}
            }
            if(priceSort==='desc'){
                sort = {price: -1}
            }
            //Se ejecuta la consulta
            const productList = await productsService.getAll(limit, page, sort, filter)
            //Si devuelve falso, hay algón problema con la consulta
            if(!productList) return res.status(404).send('No se encuentran productos en la base de datos')
            //Si devuelve verdadero, Se envía el producto encontrado como respuesta al cliente
            res.status(200).send (productList)  
    
        } catch(error){
            res.status(400).send({status:'Router error', error})
        }
    }

    getById = async (req,res)=>{
        try{
            const {pid} = req.params
            const productList = await productsService.getById(pid)
            //Si devuelve falso, hay algón problema con el Id
            if(!productList) return res.status(404).send('Error: no se encuentra ese Id')
            //Si devuelve verdadero, se ha encontrado el producto
            res.status(200).send ({status:'success', payload:productList})
            
        } catch(error){
            res.status(400).send({status:'Router error', error})
        }
    }

    create = async (req, res)=> {
        try{
            const toAddProduct = req.body
            
            const respuesta = await productsService.create(toAddProduct)
            
            //Si devuelve falso, hay algún problema con el producto
            if(!respuesta.success) {return res.status(400).send(respuesta)}
    
            //Si devuelve verdadero, se ha creado el nuevo producto
            res.status(200).send(respuesta)
    
        } catch (error) {
            res.status(400).send({status:'Router error', error})
        }
    
    }

    update = async (req , res)=>{
        const {pid} = req.params
        const toChangeProduct = req.body
    
        const updatedProduct = await productsService.update(pid, toChangeProduct)
    
        //Sí devuelve falso, hay algún problema con la actualización
        if(!updatedProduct.success) {
            return res.status(400).send(updatedProduct)
        }
        //Si devuelve verdadero, quiere decir que se hizo la actualización
        res.status(200).send(updatedProduct)
    
    }

    delete = async (req,res)=>{
        const {pid} = req.params
        const deletedProduct = await productsService.delete(pid)
        //Sí devuelve falso, hay algún problema con el borrado
        if(!deletedProduct.success){
            return res.status(400).send(deletedProduct)
        }
        //Si devuelve verdadero, quiere decir que se borró el producto
        res.status(200).send(deletedProduct)
    }

}

module.exports = new ProductController()