import mongoose from "mongoose";

const collection = 'Users';
const schema = mongoose.Schema({
    first_name:String,
    last_name:String,
    email:String,
    password:String,
    age:Number
},{timestamps:true})

const userService = mongoose.model(collection,schema);

export default userService;