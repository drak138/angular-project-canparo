import express from "express"
import mongoose from "mongoose";
import bodyParser from "body-parser"
import cors from "cors"
import User from "./models/users.js"
import { userService } from "./userService.js";
import verifyToken from "./middleware/auth.js";
import  {billService}  from "./billService.js";
import userBill from "./models/userBill.js";
import  {cardService}  from "./cardService.js";
import "./cronJobs.js";
import { contactService } from "./contactService.js";


const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://0.0.0.0:27017/Canparo-Bank', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


// Example API Routes
app.get('/api/users', async (req, res) => {
//     const newItem = new Item({ name: "Sample Item", description: "Test Description" });
// newItem.save();
    try {
        const users = await User.find();
        res.json(users);
      } catch (error) {
        res.status(500).send('Error fetching items');
      }
});

app.post('/api/users', async (req, res) => {
  const userData=req.body
  const emailInUse=await userService.checkEmail(userData.email)

  if(emailInUse){
    const error="Email in use"
    res.json({error})
    return 
  }
  const token=await userService.registerUser(userData)
  res.json({ token });
}
)
app.post('/api/users/login',async(req,res)=>{
  const {email,password}=req.body
  const emailInUse=await userService.checkEmail(email)

  if(!emailInUse){
    const error="Email isn't registered"
    res.json({error})
    return
  }
  const token=await userService.loginUser(email,password)
  res.json({token})
})
app.post('/api/users/changePass',async(req,res)=>{
  const {oldPassword,newPassword,userId}=req.body
  const result=await userService.changePass(userId,oldPassword,newPassword)
  res.json(result)
})
app.post('/api/users/deleteUser',(req,res)=>{
  const {userId}=req.body
  const result=userService.deleteUser(userId)
  res.json(result)

})
app.get('/api/bills', verifyToken, async (req, res) => {
  const userId = req.user._id; // Assume `verifyToken` attaches `user` to the request
  try {
      const bills = await userBill.find({ ownerId: userId });
      res.json({ hasBills: bills });
  } catch (error) {
      console.error('Error fetching bills:', error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post('/api/bills',async(req,res)=>{
  const {billName,balance,ownerId}=req.body
  const result=await billService.createUserBill(billName,balance,ownerId)
  res.json(result)
})
app.post("/api/bills/transfer",async(req,res)=>{
  const{biller,reciever,recieverIban,amount,reason,more}=req.body
  const correctReciever=await billService.checkReciver(reciever,recieverIban)
  if(correctReciever.error){
    return res.json(correctReciever)
  }
  return res.json(await billService.transfer(biller,recieverIban,amount,reason,more))

})
app.get("/api/bills/history",verifyToken,async(req,res)=>{
  const filter=req.headers.filter
  const IBAN=req.headers.iban
  return res.json(await billService.getHistory(filter,IBAN))
})
app.post("/api/bills/createBill",async(req,res)=>{
  const{biller,reciever,recieverIban,amount,reason,more}=req.body
  const correctReciever=await billService.checkReciver(reciever,recieverIban)
  if(correctReciever.error){
    return res.json(correctReciever)
  }
  return res.json(await billService.createBill(biller,recieverIban,amount,reason,more))
})
app.get("/api/bills/getBill",verifyToken,async(req,res)=>{
  const {iban}=req.headers
  return res.json(await billService.getUserBills(iban))
})

app.post("/api/bills/:billId/delete",verifyToken,async(req,res)=>{
  const {billId}=req.body
  return await billService.deleteBill(billId)
})
app.post("/api/:billId/delete",verifyToken,async(req,res)=>{
  const {billId}=req.body
  return await billService.deleteUserBill(billId)
})
app.post("/api/card",async(req,res)=>{
  const{cardInfo,userId}=req.body
  const{account,model,type,creditAmount}=cardInfo
  const cardNumber=await cardService.createCardNumber(model)
  const PIN=cardService.createPin()
  const CVV=cardService.createCVV()
  const expireDate=cardService.createExpireDate()
  res.json(cardService.createCard(type,expireDate,cardNumber,CVV,account,PIN,userId,model,creditAmount))
})
app.get("/api/card",verifyToken,async(req,res)=>{
  const IBAN=req.headers.iban
  return res.json(await cardService.getCards(IBAN))
})
app.get("/api/:cardId/details",verifyToken,async(req,res)=>{
  const cardId=req.params.cardId
  const cardDetails=await cardService.getDetails(cardId)
  return res.json(cardDetails)
})
app.delete("/api/card/delete",verifyToken,async(req,res)=>{
  const {cardid}=req.headers

  return res.json(await cardService.deleteCard(cardid))
})
app.post("/api/card/update",verifyToken,async(req,res)=>{
  const {cardId,dayLimit,dayLimitWithTrader,dayWithDrawLimit}=req.body
  return res.json(await cardService.updateCard(cardId,dayLimit,dayLimitWithTrader,dayWithDrawLimit))
})
app.get("/api/card/user",verifyToken,async(req,res)=>{
  const{userid}=req.headers
  return res.json(await cardService.getUserCards(userid))
})
app.post("/api/send-email",async(req,res)=>{
  const{email,theme,content}=req.body
  return contactService.sendEmail(email,theme,content)
})


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
