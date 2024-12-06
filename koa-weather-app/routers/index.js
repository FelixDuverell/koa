const Router = require("@koa/router")
const rootRouter = require("./root.router")
const weatherRouter = require("./forecast.router")

const router = new Router()

router.use("/", rootRouter.routes(), rootRouter.allowedMethods())
router.use("/forecast", weatherRouter.routes(), weatherRouter.allowedMethods())

module.exports = router
