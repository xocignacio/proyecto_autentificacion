import { Router } from "express";
import userService from "../models/Users.js";
import { createHash } from "../utils.js";
import passport from "passport";
import {isValidPassword} from '../utils.js'

const router = Router();

router.post('/register',passport.authenticate('register',{failureRedirect:'/api/sessions/registerFail'}),async (req,res)=>{
    console.log(req.user);
    res.send({status:"success", payload:req.user._id})
})

router.get('/registerFail',async(req,res)=>{
    console.log("damn, register failed");
    res.status(500).send({status:"error",error: "damn, register failed"})
  
})

router.post('/login',passport.authenticate('login',{failureRedirect:'/api/sessions/loginFail'}),async(req,res)=>{
    req.session.user ={
        name:req.user.name,
        email:req.user.email,
        id:req.user._id
    }
    res.send({status:"success",payload:req.user._id})
    
})

router.get('/loginFail',async(req,res)=>{
    console.log("damn, login failed");
    res.send({status:"error",error:"damn, login failed"})
  
})

router.get('/logout',async(req,res)=>{
    req.session.destroy(err=>{
        if(err) return res.status(500).send("error");
        res.send("ok :)")
    })
})

export default router;