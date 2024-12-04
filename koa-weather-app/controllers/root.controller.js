const getRoot = ctx => {
  ctx.body = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Weather App</title>
          <link rel="stylesheet" href="/styles/style.css">
        </head>
        <body>
          <h1>Get Weather Forecast ☁️</h1>
          <form action="/forecast" method="get">
            <input type="text" name="q" placeholder="Enter city" required>
            <button type="submit">Get Weather</button>
          </form>
        </body>
      </html>
    `
}

module.exports = { getRoot }
