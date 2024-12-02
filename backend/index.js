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


const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/Canparo-Bank', {
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
  const result=billService.createUserBill(billName,balance,ownerId)
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


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
