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
    transferHistory:[{
        type:Object
    }],
    recurringTransactions:[{
        toIBAN: { type: String, required: true },
            amount: { type: Number, required: true },
            nextExecution: { type: Date, required: true },
            reason:{type: String, required: true },
            intervalInDays: { type: Number, default: 30 },
    }],
    ownerId:{
        type:Types.ObjectId,
        ref:'User'
    }
})

const userBill=model('userBills',userBillSchema)
export default userBill