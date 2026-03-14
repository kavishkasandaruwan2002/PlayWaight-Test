require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

// --- Database Connection ---
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/smart-travel';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- Schemas ---
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  bookings: [{ hotel: String, vehicle: String, date: Date }]
});

const HotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  image: String,
  rating: Number,
  description: String
});

const VehicleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // e.g., Car, SUV, Bike
  price_per_day: { type: Number, required: true },
  image: String,
  available: { type: Boolean, default: true }
});

const User = mongoose.model('User', UserSchema);
const Hotel = mongoose.model('Hotel', HotelSchema);
const Vehicle = mongoose.model('Vehicle', VehicleSchema);

// --- Middleware ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// --- Seed Data Helper ---
const seedData = async () => {
  const hotelCount = await Hotel.countDocuments();
  if (hotelCount === 0) {
    await Hotel.insertMany([
      { name: 'Grand Luxury Resort', location: 'Sri Lanka', price: 250, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500', rating: 4.8, description: 'A beautiful luxury resort near the beach.' },
      { name: 'Mountain View Inn', location: 'Sri Lanka', price: 120, image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500', rating: 4.2, description: 'Relaxing stay in the mist-covered mountains.' },
      { name: 'Urban City Hotel', location: 'Sri Lanka', price: 90, image: 'https://images.unsplash.com/photo-1688659810075-dcd1ab9c9314?w=500', rating: 4.0, description: 'Conveniently located in the heart of Colombo.' }
    ]);
  }

  const vehicleCount = await Vehicle.countDocuments();
  if (vehicleCount === 0) {
    await Vehicle.insertMany([
      { name: 'Toyota Camry', type: 'Car', price_per_day: 50, image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500', available: true },
      { name: 'Honda CR-V', type: 'SUV', price_per_day: 80, image: 'https://images.unsplash.com/photo-1681697390363-1142eb46b76d?w=500', available: true },
      { name: 'Vespa Scooter', type: 'Bike', price_per_day: 25, image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=500', available: true }
    ]);
  }

  const testUser = await User.findOne({ email: 'john@example.com' });
  if (!testUser) {
    const hashedPassword = await bcrypt.hash('password123', 10);
    await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: hashedPassword,
      role: 'user',
      bookings: []
    });
  }
};
seedData().then(() => console.log('Seed data initialized')).catch(err => console.error('Seeding error:', err));

// --- Auth Routes ---
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    console.log(`User registered: ${email}`);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(`Registration error for ${req.body.email}:`, error);
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1h' });
    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// --- Hotel Routes ---
app.get('/api/hotels', async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/hotels/book', authenticateToken, async (req, res) => {
  try {
    const { hotelId, date } = req.body;
    const user = await User.findById(req.user.id);
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });

    user.bookings.push({ hotel: hotel.name, date });
    await user.save();
    res.status(200).json({ message: `Successfully booked ${hotel.name}!`, booking: { hotel: hotel.name, date } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// --- Vehicle Routes ---
app.get('/api/vehicles', async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/vehicles/book', authenticateToken, async (req, res) => {
  try {
    const { vehicleId, date } = req.body;
    const user = await User.findById(req.user.id);
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

    user.bookings.push({ vehicle: vehicle.name, date });
    await user.save();
    res.status(200).json({ message: `Successfully booked ${vehicle.name}!`, booking: { vehicle: vehicle.name, date } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// --- User Profile ---
app.get('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
