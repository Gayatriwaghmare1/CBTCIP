// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/eventplanner360', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Event Schema
const eventSchema = new mongoose.Schema({
  name: String,
  date: Date,
  location: String,
  description: String,
  guestList: [String],
  budget: Number,
  vendors: [String],
  schedule: [{ time: String, activity: String }],
  rsvps: [{ email: String, status: String }]
});

const Event = mongoose.model('Event', eventSchema);

// Routes
app.get('/events', async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

app.post('/events', async (req, res) => {
  const newEvent = new Event(req.body);
  await newEvent.save();
  res.json(newEvent);
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
