import ContactDto  from "../dto/contact.dto.js"

class ContactRepository {
    constructor(dao){
        this.dao = dao
    }

    getContacts = async ()=>{
        let result = await this.dao.get()
        return result
    }
    createContact = async (newContact)=>{
        let contactToInsert = new ContactDto(newContact)
        let result = await this.dao.create(contactToInsert)
        return result
    }
}

export default  ContactRepository
