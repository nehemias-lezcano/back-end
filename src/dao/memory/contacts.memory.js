import contactModel from "../mongo/model/contacts.model.js"

class ContactsDaoMemory{
    constructor(){
        this.data =[]
    }
    get=()=>{
        return this.data
    }
}

export default ContactsDaoMemory