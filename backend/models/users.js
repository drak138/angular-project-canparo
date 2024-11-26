import { Schema,model } from "mongoose";
import bcrypt from "bcrypt"

const SALT_ROUNDS=10

const userSchema= new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
userSchema.pre("save",async function(){
    const hash=await bcrypt.hash(this.password,SALT_ROUNDS)
    this.password=hash
})

const User=model('User',userSchema)
export default User
