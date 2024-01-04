import { Schema, model } from 'mongoose'

const ContactCollection = 'contacts'

const ContactSchema = Schema({
    firs_name:{
        type:String,
        required: true
    },
    last_name:{
        type:String,
        required: true
    },
    active:Boolean,
    phone:String
})


let  contactModel = model(ContactCollection,ContactSchema)

export default contactModel