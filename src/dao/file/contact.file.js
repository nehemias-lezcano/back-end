import contactModel from "../mongo/model/contacts.model.js"

class contactDaoFile{
    constructor(){
  this.contact = contactModel

    }
   async get(){
        try{
            const contact = await this.contact.find().lean()
            return contact
          
        }catch(err){
            return new Error(err)
        }
    }

    async getById(cid){
        try{
           return await this.cnatc.findOne({ _id: cid})

        }catch(error){
            return new Error (error)
        }
        
    }
    
    
    async add(newContact){
       try{
            return await this.contact.create(newContact)
       } 
         catch(error){
        return new Error (error)
       }
    
}
    async update(cid, contactToReplace ){
        
     try{
            return await this.contact.updateOne({ _id: cid },contactToReplace)
            
        }catch(error){
            return new Error (error)
           }
    } 

    
   async delete(cid){
        try{
            return await this.contact.deleteOne({_id: cid})
        }catch(error){
            return new Error (error)
           }
    }
}
  export default contactDaoFile