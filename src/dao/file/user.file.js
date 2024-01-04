import userModel from "../mongo/model/user.model.js" 

class userDaoFile{
    constructor(){
  this.user = userModel

    }
   async get(){
        try{
            const users = await this.users.find().lean()
            return users
          
        }catch(err){
            return new Error(err)
        }
    }

    async getById(pid){
        try{
           return await this.users.findOne({ _id: uid})

        }catch(error){
            return new Error (error)
        }
        
    }
    
    
    async add(newUser){
       try{
            return await this.users.create(newUser)
       } 
         catch(error){
        return new Error (error)
       }
    
}
    async update(uid, userToReplace ){
        
     try{
            return await this.users.updateOne({ _id: uid },userToReplace)
            
        }catch(error){
            return new Error (error)
           }
    } 

    
   async delete(uid){
        try{
            return await this.users.deleteOne({_id: uid})
        }catch(error){
            return new Error (error)
           }
    }
}
  export default userDaoFile