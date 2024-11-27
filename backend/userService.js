import User from "./models/users.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

const SALT_ROUNDS=10
const JWT_SECRET='my-Secret-Key'
export const userService={

    async checkEmail(email){
        const emailInUse=await User.findOne({email})
        if(emailInUse==null){
            return false
        }
        else{
            return true
        }
    },
    async registerUser(user){
        const newUser = new User(user);
        await newUser.save();
        try {
            return this.createToken(newUser)
        }
        catch (error) {
          res.status(500).send('Error creating user');
        }
    },
    async loginUser(email,password){
        const user=await User.findOne({email})
        const isValid=await bcrypt.compare(password,user.password)
        if(!isValid){
            return 
        }
        return this.createToken(user)
    },
    async changePass(userId,oldPass,newPass){
        const user=await User.findById(userId)
        const isValid=await bcrypt.compare(oldPass,user.password)
        if(!isValid){
            const error={error:"Incorrect Password"}
            return error
        }
        newPass=await bcrypt.hash(newPass,SALT_ROUNDS)
        return await User.findByIdAndUpdate(userId,{password:newPass})
    },
    createToken(user){
        const payLoad={
            _id:user._id,
            email:user.email
        }
        const token=jwt.sign(payLoad,JWT_SECRET,{expiresIn: '1h'})
        return token
    }
}