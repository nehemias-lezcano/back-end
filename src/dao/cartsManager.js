/* import  cartModel   from "./mongo/model/cart.model.js"
import productModel from "./mongo/model/product.model.js";
import { Types } from "mongoose";
class CartManager {
   
    getCarts =async() =>{
        try{
          return await cartModel.find()
        }catch(error){
            return new Error (error)
        }
    }


    getCartById = async(cartId) =>{
          try{
           return await cartModel.findOne({ _id: cartId})
        }catch(error){
            return new Error (error)
        }
       
}

    addCart = async(cart) =>{
        try {
            return await cartModel.create(cart);
          } catch (error) {
            throw new Error(error);
          }
        };

    addProductInCart = async(cid, productFromBody) =>{
          try{
            const result = await cartModel.findOne({_id: cid})
            const findProduct = result.products.some((product) =>product._id.toString() === new Types.ObjectId(productFromBody.pid).toString())
           if(findProduct){

        return await cartModel.updateOne({ _id: cid, "products._id": productFromBody.pid},{$inc:{"products.$.quantity" :productFromBody.quantity}})
           }
        return await cartModel.updateOne({ _id: cid},{$push:{products:{_id:productFromBody.pid, quantity:productFromBody.quantity }}})
    }       
      catch(error){
         
        return new Error (error)
    }
    }

 deleteCart = async(cid) =>{
    try{
        return await cartModel.deleteOne({_id: cid})
    }catch(error){
        return new Error (error)
       }
}
}




 */
/* import fs from 'fs';

class CartManager {
    constructor() {
        this.carts = [];
        this.path = './managerDaos/carts.json';
    }

    addCart = async (newCart) => {
        try {

            const carts = await this.getCarts();
            // console.log(carts);
            this.carts = carts


            //ID autoincremental
            if (this.carts.length === 0) {
                newCart.id = 1
            } else {
                newCart.id = this.carts[this.carts.length - 1].id + 1
            }

            if (Object.values(newCart).every(value => value)) {
                this.carts.push(newCart);
                const toJSON = JSON.stringify(this.carts, null, 2);
                await fs.promises.writeFile(this.path, toJSON)
            }

            return [];
        }
        catch (err) {
            console.log(err);
        }

    }

    getCarts = async () => {
        try {
            const getFileCarts = await fs.promises.readFile(this.path, 'utf-8')
            if (getFileCarts.length === 0) return [];
            return JSON.parse(getFileCarts)
        } catch (err) {
            console.log(err);
            return { status: "error", error: err }
        }
    };

    getCartById = async (id) => {
        try {
            const getFileCarts = await fs.promises.readFile(this.path, 'utf-8')
            const parseCarts = JSON.parse(getFileCarts);
            // console.log(parseCarts[id - 1]);
            if (!parseCarts[id - 1]) return { error: 'Error! The cart does not exist' }

            return parseCarts[id - 1]
        }
        catch (err) {
            console.log(err);
        }
    }

    updateCart = async (pid, data) => {
        try {
            const getFileCarts = await fs.promises.readFile(this.path, 'utf-8')
            const parseCarts = JSON.parse(getFileCarts);
            // console.log(parseProducts);
            if (isNaN(Number(pid))) return { status: "error", message: 'Invalid id' };

            const findId = parseCarts.findIndex(product => product.id == pid)
            if (findId === -1) return { status: "error", message: 'id not found' };

            this.carts = parseCarts.map(element => {
                if(element.id == pid){
                    element = Object.assign(element, data);
                   return element
                }
                return element
            })
            

            const toJSON = JSON.stringify(this.carts, null, 2);
            await fs.promises.writeFile(this.path, toJSON)
            return this.carts
        }
        catch (err) {
            console.log(err);
        }

    }
} */

// const carritos = new CartManager()

// const test = async () => {
// const carrito = {
//     productos: [
//         {
//             idProduct: 4,
//             cantidad: 10
//         },
//         {
//             idProduct: 2,
//             cantidad: 11
//         }

//     ]
// }
// await carritos.addCart(carrito)
// }
// test()

export default CartManager