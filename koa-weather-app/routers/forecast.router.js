const Router = require("@koa/router")
const { getWeather } = require("../controllers/forecast.controller")

const router = new Router()

router.get("/", getWeather)

module.exports = router
