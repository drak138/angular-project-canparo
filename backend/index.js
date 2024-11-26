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
  const emailInUse=await userService.checkEmail(userData)

  if(emailInUse){
    res.json("Email in use")
    return 
  }
  const token=await userService.registerUser(userData)
  res.json({ token });
}
)

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
