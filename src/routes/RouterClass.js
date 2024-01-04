import { Router } from "express";
import Jwt  from "jsonwebtoken";
class RouterClass{
    constructor(){
        this.router = Router()
        this.init()
    }

getRouter(){
   return this.router
}
init(){}


applyCallbacks(callbacks){
    return callbacks.map(callback => async(...params)=>{
        try{

            await callback.apply(this, params)
        }catch(error){
            console.log(error)
            params[1].status(500).send(error)
        }
    })
}

generateCustomResponse =(req,res,next)=>{
    res.sendSuccess = payload =>res.send({status:'success',payload})
    res.sendServerError = error =>res.send({status:'error',error})
    res.sendUserError = error =>res.send({status:'error',error})
    next()
}


handlePolicies = policies =>(req,res,next)=>{
    if(policies[0]==='PUBLIC')  return next()
      const autHeader = req.headers.authorization
      if(!autHeader) return res.send({status:'error', error:'No token provided'})
    const token = autHeader.split(" ")[1]
    const user = jwt.verify(token, 'CoderSecreto')
    if(!policies.includes(user.role.toUpperCase()))return res.status(403).send({status:'success', error:'not permissions'})
    req.user = user
    next()
}
//router.get('/',req,res)=>{})
get(path, policies, ...callbacks){
    this.router.get(path,this.handlePolicies(policies),this.generateCustomResponse,this.applyCallbacks(callbacks))
}

post(path, policies, ...callbacks){
    this.router.post(path,this.handlePolicies(policies),this.generateCustomResponse,this.applyCallbacks(callbacks))
}

put(path, policies, ...callbacks){
    this.router.put(path,this.handlePolicies(policies),this.generateCustomResponse,this.applyCallbacks(callbacks))
}

delete(path, policies, ...callbacks){
    this.router.delete(path,this.handlePolicies(policies),this.generateCustomResponse,this.applyCallbacks(callbacks))
}

}




export default RouterClass