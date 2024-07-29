const mongoose = require('mongoose');
const debug = require('debug')('app:mongo'); // Specify your debug namespace

// MongoDB connection URI
const mongoURI = 'mongodb://localhost:27017/ShreeJOI2'; // Replace with your own database URI

// Connect to MongoDB
mongoose.connect(mongoURI);

// Get the default connection
const db = mongoose.connection;

// Debug MongoDB connection events
db.on('connecting', () => {
  debug('Connecting to MongoDB...');
});

db.on('open', () => {
  debug('Connected to MongoDB');
});

db.on('error', (err) => {
  debug('MongoDB connection error:', err);
});

db.on('disconnected', () => {
  debug('Disconnected from MongoDB');
});

// Close the MongoDB connection when Node.js process ends
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    debug('MongoDB connection is disconnected due to application termination');
    process.exit(0);
  });
});

// Export the database connection
module.exports = db;
