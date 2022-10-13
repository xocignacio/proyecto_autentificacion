import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import usersService from '../models/Users.js';
import {isValidPassword} from '../utils.js'

const router = Router();

router.get('/current',async(req,res)=>{
    try{
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        jwt.verify(token,"CoderJWTSecret007",(err,data)=>{
            console.log(data);
            res.send(data);
        })
    }catch{
        res.send("error")
    }
})
router.post('/register',passport.authenticate('register',{failureRedirect:'/api/sessions/registerfail'}),async(req,res)=>{
    console.log(req.user);
    res.send({status:"success",payload:req.user._id})
})
router.get('/registerfail',async(req,res)=>{
    console.log("Register failed");
    res.status(500).send({status:"error",error:"Register failed"})
})
router.post('/login',passport.authenticate('login',{failureRedirect:'/api/sessions/loginfail'}),async(req,res)=>{
    req.session.user ={
        name:req.user.name,
        email:req.user.email,
        id:req.user._id
    }
    res.send({status:"success",payload:req.user._id})
})
router.get('/loginfail',(req,res)=>{
    console.log("login failed");
    res.send({status:"error",error:"Login failed"})
})

router.post('/loginjwt',async(req,res)=>{
    let user = await usersService.findOne({email:req.body.email});
    if(!user) return res.status(400).send({status:"error",error:"User doesn't exist"});
    if(!isValidPassword(user,req.body.password)) return res.status(400).send({status:"error",error:"Invalid Password"});
    let token = jwt.sign({name:user.name,email:user.email,id:user._id},"CoderJWTSecret007",{expiresIn:"24h"})
    res.send({status:"success",token})
})

router.get('/github',passport.authenticate('github',{scope:[]}),async(req,res)=>{})
router.get('/githubcallback',passport.authenticate('github',{failureRedirect:'/login'}),(req,res)=>{
    req.session.user ={
        name:req.user.name,
        email:req.user.email,
        id:req.user._id
    }
    res.redirect('/data')
})
export default router;
/* import { Router } from "express";
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

export default router; */