const Koa = require("koa")
const path = require("path")
const views = require("koa-views")
const static = require("koa-static")
const bodyParser = require("koa-bodyparser")
const router = require("./routers")

const app = new Koa()
const PORT = process.env.PORT || 3000

// set view engine
app.use(
  views(path.resolve(__dirname, "views"), {
    extension: "ejs",
  })
)

// use middleware
app.use(bodyParser())
app.use(static(path.resolve(__dirname, "public")))

// routes
app.use(router.routes())
app.use(router.allowedMethods())

// server running
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
})
