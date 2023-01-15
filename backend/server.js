const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 8000

app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI;
mongoose.set('strictQuery', true);
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => console.log("MongoDB database connection established successfully"))

const authenticationRouter = require('./routes/authentication')
const experienceRouter = require('./routes/experiences')
const usersRouter = require('./routes/users')

const errorHandler = require('./middlewares/error-middlerware')

app.use('/auth', authenticationRouter)
app.use('/api/users', usersRouter)
app.use('/api/experiences', experienceRouter)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
});