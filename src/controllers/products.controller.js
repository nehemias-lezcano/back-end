 import productService from '../service/index.js'
//import {userService}  from "../service/index.js";
//import { contactService}  from "../service/index.js";


import productModel from "../dao/mongo/model/product.model.js"

class ProductController{

async get(req, res){
    try{ 
   
        let visitor = { first_name : req.cookies.first_name,
                  role :'user'};
                   
        let products = await productService.get;
                   res.send({
                       status: 'success',
                       visitor,
                       payload:products,
                    });
                   
                  //  console.log(visitor.first_name);
                
    }catch(error) {
        console.log(error);

    
    }
    
} 


async getById(req, res){
    try{
        const{pid} = req.params
        let products = await productService.getProductById(pid);
        //let products = await productManagerMongo.getProductById(pid)
        res.render('products',{
            status:'success, get id',
            products,
         
        })
    }catch (error)  {

        console.log(error);
    }
}





async create(req, res){
    try {
        const newProduct = req.body
        //console.log(newProduct);
        let result = await productService.create(newProduct);


        res.status(200).send({
            status: 'success',
            payload: result
        })
       console.log(result)
    } catch (error) {
        console.log(error)
    }
}


async update(req, res){
    try {
        const { pid } = req.params
        const product = req.body
     console.log(pid)      
     console.log(product);
           let  productToReplace = {
                  title: product.title,
                  description: product.description,
                  thumbnail:product.thumbnail,
                 price:product.price,
                  stock:product.stock,
                  code:product.stock,
                  status:product.status,
                  category:product.category
        }  
    
    const result = await productService.updateProducts({ _id: pid}, productToReplace);
    
         console.log(productToReplace);
            
            res.status(200).send({
                status: 'success',
                payload: result
            })
        } catch (error) {
            console.log(error)
        }
        }


async delete(req, res){
    try {
        const { pid } = req.params
        const product = req.body

        let result = await productService.deleteProduct(pid, product)


        res.status(200).send({
            status: 'success',
            payload: result
        })
       // console.log(result)
    } catch (error) {
        console.log(error)
    }
}

}

export default new ProductController(); 