const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "routes" directory
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'routes')));

// Route for the home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'routes/home/home.html'));
  // res.sendFile(path.join(__dirname, '/landing.html'));

});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 