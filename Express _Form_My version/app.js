
// app.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve form.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'form.html'));
});

// Handle form submission
app.post('/submit', (req, res) => {
  const { name, email, phone, message } = req.body;

  // ✅ Use absolute file path so it always saves in the same folder
  const filePath = path.join(__dirname, 'data.txt');

  const formData = `
Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}
---------------------------\n`;

  // ✅ Create and save data
  fs.appendFile(filePath, formData, (err) => {
    if (err) {
      console.error('❌ Error saving data:', err);
      res.send('<h2>Error saving data 😢</h2>');
    } else {
      console.log('✅ Data saved successfully to data.txt');
      res.send(`
        <h2>✅ Form Submitted Successfully!</h2>
        <p>Your details are saved inside <b>data.txt</b></p>
        <a href="/">Go Back</a>
      `);
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
