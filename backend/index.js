import express from "express"
import mongoose from "mongoose";
import bodyParser from "body-parser"
import cors from "cors"
import User from "./models/users.js"
import { userService } from "./userService.js";


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
  console.log(result)
  res.json(result)
})
app.post('/api/users/delete',(req,res)=>{
  //TODO
})


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
