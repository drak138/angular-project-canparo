import { Schema,Types,model } from "mongoose";
import bcrypt from 'bcrypt'
import User from "./users.js";
import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv'
dotenv.config();


const SALT_ROUNDS=10
const img='/backend/1000_F_540998236_9sDc4xxdGOn5bYflNBwVXSdcC46DyfNB.jpg'
const sendGridKey=process.env.SENDGRID_API_KEY // your Send grid Key

const cardsSchema=new Schema({
    cardNumber:{
        type:Number,
        required:true
    },
    model:{
        type:String,
        enum: ['MasterCard', 'Visa'],
        required:true
    },
    type:{
        type:String,
        enum:['Credit','Debit'],
        required:true
    },
    PIN:{
        type:String,
        required:true
    },
    expireDate:{
        type:String,
        required:true
    },
    CVV:{
        type:Number,
        required:true
    },
    creditAmount:{
        type:Number,
        required:false
    },
    creditUsed:{
        type:Number,
        required:false
    },
    status:{
        type:Boolean,
        required:true
    },
    dayWithDrawLimit:{
        type:Number,
        required:true
    },
    dayLimitWithTrader:{
        type:Number,
        required:true
    },
    dayLimit:{
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
// cardsSchema.pre("save",async function(){
//     const hash=await bcrypt.hash(this.PIN,SALT_ROUNDS)
//     this.PIN=hash
// })

cardsSchema.pre("save", async function (next) {
        // Hash the PIN after sending the email
        const plainPIN = this.PIN;
        sgMail.setApiKey(sendGridKey);
        const owner = await User.findById(this.ownerId);
        if (!owner) {
            return next(new Error("Owner not found."));
        }
        const name = `${owner.firstName} ${owner.lastName}`;
        const msg = {
            to: owner.email,
            from: "preslav.geshev@gmail.com", // your Send grid email
            subject: 'Your New Card PIN',
            html:`<html>
      <head>
        <style>
          /* Ensure the email body has a consistent background image */
          body {
          }
        </style>
      </head>
      <body>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="10" style="border: none;">
          <tr>
            <td style="text-align: center; padding: 20px; background-image: url('https://as1.ftcdn.net/v2/jpg/05/40/99/82/1000_F_540998236_9sDc4xxdGOn5bYflNBwVXSdcC46DyfNB.jpg');background-size: cover; background-position: center center; padding: 30px; text-align: center; color: white;">
              <p style="color:orange">Dear ${name},</p>
              <p style="color:orange">Your card PIN is: <strong>${plainPIN}</strong></p>
              <p style="color:orange">Please keep it secure.</p>
              <p style="color:orange">Best regards,<br>Your Company</p>
            </td>
          </tr>
        </table>
      </body>
    </html>`,
        };
        sgMail
    .send(msg)
    .then(async () =>{
    })
    .catch((error) => console.error('Error sending email:', error));
    const hash = await bcrypt.hash(this.PIN.toString(), SALT_ROUNDS);
    this.PIN=hash
});

const Card=model("Card",cardsSchema)
export default Card

