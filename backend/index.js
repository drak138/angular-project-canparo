import express from "express"
import mongoose from "mongoose";
import bodyParser from "body-parser"
import cors from "cors"
import User from "./models/users.js"
import jwt from "jsonwebtoken";


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

const JWT_SECRET='my-Secret-Key'

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
  const newUser = new User(req.body);
  await newUser.save();
  try {const token = jwt.sign(
    { id: newUser._id, email: newUser.email },
    JWT_SECRET,
    { expiresIn: '1h' } // Token expires in 1 hour
  );
  res.json({ token });
}
  catch (error) {
    res.status(500).send('Error creating user');
  }
}
)

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
