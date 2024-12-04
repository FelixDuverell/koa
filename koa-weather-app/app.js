const Koa = require("koa")
const Router = require("@koa/router")
const koaStatic = require("koa-static")
const path = require("path")
const bodyParser = require("koa-bodyparser")
const forecastRouter = require("./routers/forecast.router")
const rootRouter = require("./routers/root.router")

const app = new Koa()
const router = new Router()

// Serve static files from the 'public' folder
app.use(koaStatic(path.join(__dirname, "public")))

// Routes
router.use("/", rootRouter.routes())
router.use("/forecast", forecastRouter.routes())

app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods())

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
