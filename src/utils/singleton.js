import mongoose from "mongoose";

export default class MongoSingleton {
    static #instance 
    constructor(){
        console.log(process.env.MONGO_URL_LOCAL)
        mongoose.connect(process.env.MONGO_URL_LOCAL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    }
    static getInstance(){
        if (this.#instance) {
            console.log('Base de datos ya esta creada')
            return this.#instance
        }
        this.#instance = new MongoSingleton()
        console.log('Base de datos creada')
        return this.#instance
    }
}

