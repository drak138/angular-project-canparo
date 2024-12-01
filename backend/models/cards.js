import { Schema,Types,model } from "mongoose";
import bcrypt from 'bcrypt'

const SALT_ROUNDS=10

const cardsSchema=new Schema({
    cardNumber:{
        type:Number,
        required:true
    },
    cardModel:{
        type:String,
        enum: ['MasterCard', 'Visa'],
        required:true
    },
    cardType:{
        type:String,
        enum:['Credit','Debit'],
        required:true
    },
    cardPass:{
        type:Number,
        required:true
    },
    billId:{
        type:Types.ObjectId,
        ref:"userBills"
    },
    ownerId:{
        type:Types.ObjectId,
        ref:'User'
    }
})
cardsSchema.pre("save",async function(){
    const hash=await bcrypt.hash(this.cardPass,SALT_ROUNDS)
    this.cardPass=hash
})

const Card=model("Card",cardsSchema)
export default Card

