import productModel from './model/product.model.js'
import mongoosePaginate from 'mongoose-paginate-v2'

class ProductDaoMongo {
    constructor(){
        this.product = productModel
    }
   
    async get(){
        try{
            const products = await this.product.find().lean()
            return products
          
        }catch(err){
            return new Error(err)
        }
    }

    async getById(pid){
        try{
           return await this.product.findOne({ _id: pid})

        }catch(error){
            return new Error (error)
        }
        
    }
    
    
    async create(newProduct){
       try{
            return await this.product.create(newProduct)
       } 
         catch(error){
        return new Error (error)
       }
    
}
    async update(pid, productToReplace ){
        
     try{
            return await this.product.updateOne({ _id: pid },productToReplace)
            
        }catch(error){
            return new Error (error)
           }
    } 

    
   async delete(pid){
        try{
            return await this.product.deleteOne({_id: pid})
        }catch(error){
            return new Error (error)
           }
    }


    /* async getOrderProduct(){
          try{
         // return await productModel.aggregate([
            console.log("order")
            return await productModel.paginate({},{limit:5, page})
            
         
         // ])


          }catch(error){
            return new Error (error)
           }

    } 
 */
}

export default ProductDaoMongo;