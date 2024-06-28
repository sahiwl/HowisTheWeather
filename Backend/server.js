// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
// const apiKey = "2d847c5acf691e24dce70e0e25909f4a"
// const city = "delhi"

app.use(cors());

app.get('/weather', async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.VITE_API_KEY;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
