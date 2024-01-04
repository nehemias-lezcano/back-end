import config from '../config/configServer.js'
import ProductDaoMongo from '../dao/mongo/product.mongo.js'
import { ContactDao,
         UserDao, 
         ProductDao
    } 
     from '../dao/factory.js';

import ContactRepository  from '../repositories/contacts.repositories.js'

const productService = new ProductDao();
const userService = new UserDao();
const contactService = new ContactRepository(ContactDao);




export default {
    productService,
    userService,
    contactService
};


 



/* //traer instacia de los daos
 import UserDaoMongo from "../dao/mongo/user.mongo.js"
import ProductDaoMongo from "../dao/mongo/product.mongo.js"
import ProductDaoMemory from "../dao/memory/product.memory.js"

const userService = new UserDaoMongo()
const productService = new ProductDaoMongo()
//const productService = new ProductDaoMemory()



export default {productService,userService} 
 */