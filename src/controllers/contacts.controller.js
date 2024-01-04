import ContactDto from "../dto/contact.dto.js"
import contactService from "../service/index.js"

class ContactController {
      getContacts =async(req,res)=>{ 
        //let resultado= await
        res.send({
            Status:'success',
            payload:'contactos get'
        })
      }
      createContacts =async(req,res)=>{ 
        let {name, last_name,phone} = req.body
        //let newContact = new ContactDto(name, last_name, phone)
     let result = await contactService.create(name, last_name, phone)
        res.send({
            Status:'success',
            payload:result
        })
      }


}

export default new ContactController()