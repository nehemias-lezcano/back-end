import productModel from "../mongo/model/product.model.js"

class ProductDaoMemory{

    constructor(){
          this.products=[]

    }
    get() {
        return this.products;
    }
            
     getById(pid){
     return this.products.findOne(product => pid === product.id)
    }
    
    create(newProduct){
     return this.products.push(newProduct)
    } 
  
    update(pid, productToReplace ){
    return this.products.updateOne({ _id: pid },productToReplace)
    } 

    delete(pid){
    return this.products.deleteOne({_id: pid})
    }
  
    }

    export default ProductDaoMemory