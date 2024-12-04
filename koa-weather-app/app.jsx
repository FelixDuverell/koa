const koa = require("koa")
const Router = require("@koa/router")
const bodyParser = require("koa-bodyparser")
const axios = require("axios")
require("dotenv").config()

const app = new koa()
const router = new Router()

router.get("/weather", async ctx => {
  const city = ctx.query.city || "New York"
  const apiKey = process.env.OPENCAGE_API_KEY

  try {
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${mySecret}&pretty=1`,
      {
        params: {
          q: city,
          appid: apiKey,
          units: "metric",
        },
      }
    )

    ctx.body = {
      city: response.data.name,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
    }
  } catch (error) {
    ctx.status = error.response?.status || 500
    ctx.body = { error: error.message }
  }
})

//middleware
app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods())

//start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
