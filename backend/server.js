const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

const PORT = 5001;
const MONGODB_URI = 'mongodb+srv://acumensecurity_db_user:Rup8tbHY9C7B8xLJ@acumen.eete98z.mongodb.net/acumensecurity_db_user?appName=acumen';

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/subcategories', require('./routes/subcategories'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/downloads', require('./routes/downloads'));

// Database Connection
mongoose
    .connect(MONGODB_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log('MongoDB Connection Error:', err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
