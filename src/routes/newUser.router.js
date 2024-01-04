import RouterClass from "./RouterClass.js"

 class UserRouter extends RouterClass {
   init(){
       this.get('/',['PUBLIC'],async(req,res)=>{
        try{
        res.sendSuccess('Hola Coder')
    }catch (error){
        res.sendServerError(error)
    }
       })
       this.get('/current',['PUBLIC'],async(req,res)=>{
        try{
        res.sendSuccess('validar')
    }catch (error){
        res.sendServerError(error)
    }
       })

   }
}

export default UserRouter 