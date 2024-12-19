const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 1337;

// Middleware
app.use(cors()); // Allow requests from frontend
app.use(express.json()); // Parse incoming JSON data

// Connect to MongoDB
mongoose.connect('mongodb+srv://z1klam8790:B1exbXlxtGrOQl94@cluster0.48axr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Define User Schema
const userSchema = new mongoose.Schema({
  name: String,
  dateCreated: { type: Date, default: Date.now },
  email: String,
  whatsappNumber: String,
  type: String,
});

// Create User Model
const User = mongoose.model('User', userSchema);

// Define Campaign Schema
const campaignSchema = new mongoose.Schema({
  name: String,
  dateCreated: { type: Date, default: Date.now },
  dateDeadline: Date,
  priority: { type: String, enum: ['High', 'Medium', 'Low'] },
  addedBy: String,
  status: { type: String, enum: ['Done', 'In Progress'] },
});

// Create Campaign Model
const Campaign = mongoose.model('Campaign', campaignSchema);

// Routes
app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

// Example API route: Fetching data
app.get("/api/data", (req, res) => {
  res.json(["Item 1", "Item 2", "Item 3"]);
});

// Example API route: Sending data (POST)
app.post("/api/data", (req, res) => {
  const { input } = req.body;
  console.log("Received input:", input);
  res.json({ message: "Data received successfully!", input });
});

// API route: Add user (POST)
app.post("/api/users", async (req, res) => {
  const { name, email, whatsappNumber, type } = req.body;

  const newUser = new User({ name, email, whatsappNumber, type });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error saving user:", error); // Log the error for debugging
    res.status(400).json({ message: "Error saving user", error });
  }
});

// API route: Update user (PUT)
app.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, whatsappNumber, type } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, { name, email, whatsappNumber, type }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: "Error updating user", error });
  }
});

// API route: Get all users (GET)
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

// API route: Delete user (DELETE)
app.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
});

// API route: Add campaign (POST)
app.post("/api/campaigns", async (req, res) => {
  const { name, dateDeadline, priority, addedBy, status } = req.body;

  const newCampaign = new Campaign({ name, dateDeadline, priority, addedBy, status });

  try {
    const savedCampaign = await newCampaign.save(); // Save to MongoDB
    res.status(201).json(savedCampaign); // Respond with the saved campaign
  } catch (error) {
    console.error("Error saving campaign:", error);
    res.status(400).json({ message: "Error saving campaign", error });
  }
});

// API route: Get all campaigns (GET)
app.get("/api/campaigns", async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: "Error fetching campaigns", error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
