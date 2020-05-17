require('dotenv').config();
const axios = require('axios');

const APIKEY = process.env.API_KEY;
const url = `https://api.openweathermap.org/data/2.5/weather`;

module.exports = async (city, next) => {
  try {
    const response = await axios.get(`${url}?q=${city}&appid=${APIKEY}`);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    next(error);
  }
};
