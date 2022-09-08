import passport from "passport";
import local from 'passport-local';
import userService from '../../models/Users.js'

const localStrategy = local.Strategy; /// en local utilizo username + password

const initializePassport = () => {
    passport.use('register', new localStrategy({passReqToCallback:true,usernameField:'email'}, async(req,email,password,done)=>{        /// mi estrategia utiliza por username el email
        try {
            const {name} =req.body;
        if(!first_name||!last_name||!email||!password) return done(null,false);
        let exists = await userService.findOne({email:email});
        if(exists) return done(null,false);
        let result = await userService.create({
            name,
            email,
            password:createHash(password)
        })
        return done (null,result)
        } catch (error) {
            return done(error);
        }
    })) 

  passport.use('login', new localStrategy({usernameField:"email"},async(email,password,done)=>{
    try{
      
        if(!email||!password) return done(null,false);
        let user = await userService.findOne({email:email});
        if(!user) return done(null,false);
      if (!isValidPassword(user,password)) return done(null,false);
      return done(null,user)
       
        
    }catch(error){
        console.log(error);
       return done(error);
    }
  }))







    passport.serializeUser((user,done) =>{
        done(null,user._id)
    })
    passport.deserializeUser(async(id,done)=>{
        let result = await userService.findOne({_id:id})
        return done(null,result);
    })
}

export default initializePassport;