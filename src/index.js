const dotEnv = require('dotenv')

dotEnv.config({ path: "./config.env" })

const express = require('express')
const route = require('./routes/route')
const app = express()
const multer = require('multer')

app.use(express.json())
app.use(multer().any())

app.use('/', route)



app.listen(process.env.port || 3000, () => console.log(`App is running on port ${process.env.port || 3000}`))