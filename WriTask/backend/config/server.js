const path = require('node:path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');
const authRoutes = require('../routes/authRoutes');

dotenv.config({ path: path.resolve(__dirname, '../.env') });
// Fallback: directly parse the backend .env file if dotenv didn't set variables
if (!process.env.MONGO_URI) {
  try {
    const fs = require('fs');
    const parsed = require('dotenv').parse(
      fs.readFileSync(path.resolve(__dirname, '../.env'))
    );
    Object.keys(parsed).forEach((k) => {
      if (!process.env[k]) process.env[k] = parsed[k];
    });
  } catch (e) {
    console.error('fallback .env load failed:', e.message);
  }
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: true }));
app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Login backend is running' });
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('DB connection failed:', err);
    process.exit(1);
  });
