import { Router } from "express"
import contactsController from "../controllers/contacts.controller.js"

const router =  Router()

router.get('/', contactsController.getContacts)

router.post('/', contactsController.createContacts)




export default router