import { cartsModel } from "../models/carts.model.js";

class CartManagerDB {

    async findAllCart() {

        const response = await cartsModel.find();
        return response;


    };

    async findCartById(idCart) {

        const response = await cartsModel.findById(idCart);
        return response;


    };

    async createOneCart() {

        const newCart = { products: [] };

        const response = await cartsModel.create(newCart);
        return response;

    };

    async addProductToCart(idCart, idProduct) {

        const cart = await cartsModel.findById(idCart);

        const productIndex = cart.products.findIndex(
            (item) => item.product.equals(idProduct)
        );

        if (productIndex !== -1) {
            cart.products[productIndex].quantity++;
        } else {
            cart.products.push({ product: idProduct, quantity: 1 });
        }

        return cart.save()

    };

}

export { CartManagerDB };