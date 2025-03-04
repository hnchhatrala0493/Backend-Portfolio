const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Backend is running on Vercel!')
})

// Export a function instead of running `app.listen`
module.exports = (req, res) => {
  return app(req, res)
}
