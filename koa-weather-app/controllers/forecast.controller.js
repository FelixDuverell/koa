const axios = require("axios")
require("dotenv").config()

const WEATHER_API_KEY = process.env.OPENCAGE_API_KEY

const getWeather = async ctx => {
  const city = ctx.query.q

  if (!city) {
    ctx.body = `
      <!DOCTYPE html>
      <html>
        <body>
          <h1>Error</h1>
          <p>City is required!</p>
          <a href="/">Go back</a>
        </body>
      </html>
    `
    return
  }

  try {
    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m`,
      {
        params: {
          q: city,
          appid: WEATHER_API_KEY,
          units: "metric",
        },
      }
    )

    const data = response.data

    ctx.body = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Weather Forecast</title>
        </head>
        <body>
          <h1>Weather in ${data.name}</h1>
          <p>Temperature: ${data.main.temp}°C</p>
          <p>Weather: ${data.weather[0].description}</p>
          <p>Humidity: ${data.main.humidity}%</p>
          <p>Wind Speed: ${data.wind.speed} m/s</p>
          <a href="/">Search another city</a>
        </body>
      </html>
    `
  } catch (error) {
    ctx.body = `
      <!DOCTYPE html>
      <html>
        <body>
          <h1>Error</h1>
          <p>Could not fetch weather for "${city}". Please try again.</p>
          <a href="/">Go back</a>
        </body>
      </html>
    `
  }
}

module.exports = { getWeather }
