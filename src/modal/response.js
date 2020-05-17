const moment = require('moment');

function windDirection(degree) {
  let directions = [
    'North',
    'North-East',
    'East',
    'South-East',
    'South',
    'South-West',
    'West',
    'North-West',
  ];
  return directions[parseInt(Math.round((parseFloat(degree) % 360) / 45) % 8)];
}

const weather = (data) => {
  const formatted = {};

  let currTime = data.dt;
  formatted.currTime = moment.unix(data.dt).format('HH:mm A');

  formatted.name = `${data.name}, ${data.sys.country}`;
  if (
    data.weather[0].main.toUpperCase() ===
    data.weather[0].description.toUpperCase()
  ) {
    formatted.main = data.weather[0].main;
    formatted.description = null;
  } else {
    formatted.main = data.weather[0].main;
    formatted.description = data.weather[0].description;
  }
  formatted.currTemp = `${(data.main.temp - 273.15).toFixed(0)}`;
  formatted.minTemp = `${(data.main.temp_min - 273.15).toFixed(0)}`;
  formatted.maxTemp = `${(data.main.temp_max - 273.15).toFixed(0)}`;

  formatted.weatherIcon = data.weather[0].icon;
  formatted.wind = `${data.wind.speed} m/s`;

  if (data.wind.deg) {
    formatted.windDirection = `${windDirection(data.wind.deg)}`;
  }

  formatted.sunrise = moment.unix(data.sys.sunrise).format('HH:mm A');
  formatted.sunset = moment.unix(data.sys.sunset).format('HH:mm A');

  return formatted;
};

exports.weather = weather;
