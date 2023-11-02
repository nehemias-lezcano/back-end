import { Schema, model} from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

//import pkg from 'mongoose-paginate-v2';
//const { mongoosePaginate } = pkg;


const productsSchema = new Schema({


    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true

    },

    code: {

        type: String,
        required: true,
        unique: true,
    },

    stock: {

        type: Number,
        required: true
    },
    category: {

        type: String,
        required: true
    },
    thumbnails: {

        type: String,

    }

});

productsSchema.plugin(mongoosePaginate);


const productsModel = model("Products", productsSchema);
export { productsModel };