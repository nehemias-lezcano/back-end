 //import userModel from "./model/user.model.js";
import mongoosePaginate from 'mongoose-paginate-v2'
import userModel from '../mongo/model/user.model.js'
class UserDaoMongo {
    constructor(){
        this.userModel = userModel
    }
    async get(){
        try{

       //mongoose- paginate
       //const { docs } = users
      return await userModel.find({})
      //paginate({},{limit:10, page:1, lean:true})
       
        }catch(err){
            return new Error(err)
        }
    }
    async getById(uid){
        return await this.userModel.finOne({_id :uid})
    }

    create = async (newUser)=>{
       return await this.userModel.create(newUser)
      
    }
    
    async update(uid, userUpdate){
        return await this.userModel.findOneAndUpdate({_id: uid}, {userUpdate})


    }
    async delete(uid){
        return await this.userModel.findOneAndDelete({_id :uid})
    }
}

export default UserDaoMongo; 