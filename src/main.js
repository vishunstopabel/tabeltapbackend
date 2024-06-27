// main.js (or your server entry point)

const express = require('express');
const handlePayment = require('./tempCodeRunnerFile'); // Adjust path as necessary

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Define route for handling payment
app.post('/api/handlePayment', handlePayment);

// Start the server
const PORT = 5173;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

