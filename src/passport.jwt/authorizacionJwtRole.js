  const authorization = role =>{
    return async (req,res,next) =>{
     console.log('role auth',role)
     console.log('user auth',req.user);
      if(!req.user)return res.status(401).send({status:'error', error:'Unauthorized es aca'})
        if(req.user.user.role !== role) return res.status(403).send({status:'error', error:'Not permissions'})
        next()
    
    
}

}


    export default authorization   