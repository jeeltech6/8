const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// MongoDB Atlas Connection
mongoose.connect('mongodb+srv://jeel:jeel@cluster0.u0yrxd6.mongodb.net/')
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Task Schema
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  priority: { type: String, enum: ['urgent', 'high', 'low'], default: 'low' },
});

const Task = mongoose.model('Task', taskSchema);

// Routes
app.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.render('index', { tasks });
  } catch (error) {
    res.status(500).send("Error loading tasks.");
  }
});

app.post('/add', async (req, res) => {
  const { title, priority } = req.body;
  if (!title) return res.redirect('/');
  await Task.create({ title, priority });
  res.redirect('/');
});

app.post('/delete/:id', async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.redirect('/');
});

app.post('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { title, priority } = req.body;
  if (!title) return res.redirect('/');
  await Task.findByIdAndUpdate(id, { title, priority });
  res.redirect('/');
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
