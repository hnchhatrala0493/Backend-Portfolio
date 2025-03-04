import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import doConnection from './config/dbConnection.js'
import Skills from './routes/skills.js'
import Education from './routes/education.js'

dotenv.config()
const app = express()

app.use(cors({ origin: '*' }))
app.use(
  express.urlencoded({
    extended: true,
  }),
)
app.use('/uploads', express.static('uploads'))
app.use(express.json())

app.use('/api/skills', Skills)
app.use('/api/education', Education)

doConnection()
app.listen(5000, (error) => {
  if (!error) console.log('Server is Successfully Running,  and App is listening on port ' + 5000)
  else console.log("Error occurred, server can't start", error)
})
