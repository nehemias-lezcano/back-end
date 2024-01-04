import mongoose from "mongoose"
import { Schema,model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const collection = 'products'

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        index:true
    },
    description:{
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    status: Boolean,
    
    category:String,
    
    code: {
        type: String,
        unique: true,
        required: true
    }
})

productSchema.plugin(mongoosePaginate)
const productModel = model(collection, productSchema)
export default productModel
