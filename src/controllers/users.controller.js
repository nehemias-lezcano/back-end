import userModel from "../dao/mongo/model/user.model.js"
import mongoosePaginate from 'mongoose-paginate-v2';
import userService from "../service/index.js"
class UserController{

    async get(req,res){
        try {
            const users = await userService.get()
            res.send({
                status: 'success',
                payload: users
            }) 

   }catch (error){
        console.log(error);
    }
    
}


async create(req, res){
    try {
        let user = req.body

       if(!user.nombre || !user.apellido){ 
            return res.status(400).send({status:'error', mensaje: 'todos los campos son necesarios'})
        }

        const newUser = {
            first_name: user.nombre, 
            last_name: user.apellido,
            email: user.email
        } 
        
        let result =  await userService.create(newUser) 

        
        res.status(200).send({result})
    } catch (error) {
        console.log(error)
    }
    
}


async update(req, res){
    const { uid } = req.params
    const user = req.body

    // validar pid 
    // if(!id)   
    // validar campos 
    if(!user.nombre || !user.apellido){ 
        return res.status(400).send({status:'error', mensaje: 'todos los campos son necesarios'})
    }
   
    let  userToReplace = {
        first_name: user.nombre,
        last_name: user.apellido,
        email: user.email
    }

    let result = await userService.updateOne({_id: uid}, userToReplace)
    

    res.send({
        status: 'success',
        payload: result
    })
}


async delete(req, res) {
    try {
        let {uid} = req.params
        // buscar por pid user
    
        let result = await userService.deleteOne({_id: uid})
        res.send({status: 'success', payload: result})
        
    } catch (error) {
        console.log(error)
    }
}

}


export default  new UserController()