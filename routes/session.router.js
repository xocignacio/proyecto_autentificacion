import { Router } from "express";
import userService from "../models/Users.js";

const router = Router();

router.post('/register',async (req,res)=>{
    const {first_name,last_name,email,age,password} =req.body;
    if(!first_name||!last_name||!email||!password) return res.status(400).send({error:"Incomplete values"})
    let user = {
        first_name,
        last_name,
        email,
        age:age,
        password
    }
    try{
        const result = await userService.create(user);
        res.send({status:'success',payload:result})
    }catch(error){
        res.status(500).send({error:error})
    }
})

router.post('/login',async(req,res)=>{
    console.log(req.body);
    try{
        const {email,password} = req.body;
        if(!email||!password) return res.status(400).send({error:"Incomplete values"})
        const user = await userService.findOne({$and:[{email:email},{password:password}]},{first_name:1,last_name:1,email:1});
        if(!user) return res.status(400).send({error:'User not found'});
        req.session.user = user;
        res.send({status:"success",payload:user})
    }catch(error){
        res.status(500).send({error:error})
    }
})

router.get('/logout',async(req,res)=>{
    req.session.destroy(err=>{
        if(err) return res.status(500).send("error");
        res.send("ok :)")
    })
})

export default router;