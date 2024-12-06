const axios = require("axios")

const getWeather = async ctx => {
  const city = ctx.query.q

  try {
    if (!city) {
      ctx.status = 400
      ctx.body = { msg: "Invalid query" }
    } else {
      const geocodeData = await getGeocodeData(city)

      if (geocodeData.results.length === 0) {
        ctx.status = 404
        ctx.body = { msg: "No data found" }
      } else {
        const { lat, lng } = geocodeData.results[0].geometry
        const weatherData = await getWeatherData(lat, lng)

        await ctx.render("forecast", { weatherData, geocodeData })
      }
    }
  } catch (error) {
    ctx.status = 500
    ctx.body = { msg: error.message }
  }
}

const getGeocodeData = async city => {
  const { OPENCAGE_API_KEY } = require("../config/secrets")

  const response = await axios.get(
    `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${`0a42525f979b473da4309700cbe6c036&q`}&pretty=1`
  )

  return response.data
}

const getWeatherData = async (lat, lng) => {
  const OPENMETEO_URL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,windspeed_10m,winddirection_10m&hourly=temperature_2m&timezone=auto`
  const response = await axios.get(OPENMETEO_URL)

  return response.data
}

module.exports = { getWeather }
