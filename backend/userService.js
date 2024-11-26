import User from "./models/users.js";
import jwt from "jsonwebtoken";

const JWT_SECRET='my-Secret-Key'
export const userService={

    async checkEmail(user){
        const emailInUse=await User.findOne({email:user.email})
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
    createToken(user){
        const payLoad={
            id:user._id,
            email:user._id
        }
        const token=jwt.sign(payLoad,JWT_SECRET,{expiresIn: '1h'})
        return token
    }
}