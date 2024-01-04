import contactModel from "./model/contacts.model.js"

class ContactDaoMongo {
    constructor (){
    this.contactModel = contactModel
    }
    get = async()=> this.contactModel.find({})
    create = async(newContact)=> this.contactModel.create(newContact)
}


export default ContactDaoMongo