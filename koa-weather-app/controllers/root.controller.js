const getRoot = async ctx => {
  await ctx.render("root")
}

module.exports = { getRoot }
