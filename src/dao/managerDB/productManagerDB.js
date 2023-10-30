import { response } from "express";
import { productsModel } from "../models/products.model.js";
class ProductManagerDB {

    async findAll() {

        const response = await productsModel.find();
        return response;


    };


    async findById(id) {

        const response = await productsModel.findById(id);
        return response;

    };

    async createOne(obj) {

        const response = await productsModel.create(obj);
        return response;

    };

    async updateOne(id, obj) {

        const response = await productsModel.updateOne({ _id: id }, obj);
        return response;

    };

    async deleteOne(id) {

        const response = await productsModel.deleteOne({ _id: id });
        return response;

    };


}

export { ProductManagerDB };