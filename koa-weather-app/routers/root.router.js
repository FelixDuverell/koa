const Router = require("@koa/router")
const { getRoot } = require("../controllers/root.controller")

const router = new Router()

router.get("/", getRoot)

module.exports = router
