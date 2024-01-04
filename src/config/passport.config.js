import passport from 'passport'
import local from 'passport-local'
import GithubStrategy from 'passport-github2'
import userModel from '../managerDaos/mongo/model/user.model.js'
import {createHash} from '../utils/bcryptHash.js'
import {isValidPassword} from '../utils/bcryptHash.js'
import dotenv from 'dotenv'
import session from 'express-session'
import jwt  from 'jsonwebtoken'

dotenv.config();

const LocalStrategy = local.Strategy

const initPassport = () => {  //passport local
    //configurar el registro
    
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'

    }, async (req, username, password, done)=>{
         const {first_name, last_name} = req.body
          try {
             let userDb = await userModel.findOne({ email:username})
             if(userDb) return done(null, false)

             let newUser ={
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              email:username,
              password:createHash(password)
            }
           
            
            let result = await userModel.create(newUser)
            return done(null, result)
          } catch (error) {
            return done('Error al obtener el usuario'+ error)
          }
    }))
    passport.serializeUser((user,done)=>{
        done(null, user._id)
    })
    passport.deserializeUser(async (id,done)=>{
        let user =await userModel.findOne({_id :id})
       done(null, user)
    }) 
}

/// passport local
    passport.use('login', new LocalStrategy({
        usernameField:'email'
    }, async(username, password, done)=>{
        const userDb = await userModel.findOne({email:username})
        
        try {
            
            if(!userDb) return done(null, false)
            if(!isValidPassword(password, userDb))return done(null, false)
            
            return done(null, userDb)
            
        } catch (error) {
            return done (error)
        }
    }))

   
    const initPassportGithub = ()=>{
        passport.use('github', new GithubStrategy({
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL
        }, async (accessToken, refreshToken, profile, done)=>{
            console.log('Profile', profile)
            try {
                let user = await userModel.findOne({email: profile._json.email})
                //console.log(user);
                if(!user){
                    let newUser = {
                        firts_name: profile.username,
                        last_name: profile.username,
                        email: profile._json.email,
                        password: ''
                    }
                   
                    let result = await userModel.create(newUser)
                    return done(null, result)
                }
                return done(null, user)
                
            } catch (error) {
                console.log(error)
            }
        }))
        passport.serializeUser((user, done)=>{
            done(null, user._id)
        })
    
        passport.deserializeUser(async (id, done)=>{
            let user = await userModel.findOne({_id:id})
            done(null, user)
        })
    
    }
    


export { initPassport, initPassportGithub }

 