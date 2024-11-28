import { Schema,model,Types } from "mongoose";


const userBillSchema= new Schema({
    IBAN:{
        type:String,
        required:true
    },
    billName:{
        type:String,
        required:true
    },
    balance:{
        type:Number,
        required:true,
        minimum: 50,
        description: "must be a number and at least 50"
    },
    ownerId:{
        type:Types.ObjectId,
        ref:'User'
    }
})

const userBill=model('userBills',userBillSchema)
export default userBill