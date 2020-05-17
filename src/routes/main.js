const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const getWeather = require('../modal/getWeather');
const formatted = require('../modal/response');

router.get('/', async (req, res, next) => {
  const weather = await getWeather('Bengaluru', next);
  const response = formatted.weather(weather);
  // res.send(response);
  res.render('index', {
    currTime: response.currTime,
    name: response.name,
    main: response.main,
    description: response.description,
    currTemp: response.currTemp,
    minTemp: response.minTemp,
    maxTemp: response.maxTemp,
    imgSrc: `https://openweathermap.org/img/wn/${response.weatherIcon}.png`,
    wind: response.wind,
    windDirection: response.windDirection,
    sunrise: response.sunrise,
    sunset: response.sunset,
  });
  res.writeContinue(); //continue sending body body of the request
});

router.post(
  '/',
  [check('city').isLength({ min: 3, max: 10 }).isAlpha()],
  async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      next({
        status: 422,
        message: error.errors[0].msg,
      });
    }

    const city = req.body.city;
    const weather = await getWeather(city, next);
    const response = formatted.weather(weather);
    res.render('index', {
      currTime: response.currTime,
      name: response.name,
      main: response.main,
      description: response.description,
      currTemp: response.currTemp,
      minTemp: response.minTemp,
      maxTemp: response.maxTemp,
      imgSrc: `https://openweathermap.org/img/wn/${response.weatherIcon}.png`,
      wind: response.wind,
      windDirection: response.windDirection,
      sunrise: response.sunrise,
      sunset: response.sunset,
    });
  }
);

module.exports = router;
