const cors = require('cors')
require('dotenv').config()
const express = require('express')

const { dbConnection } = require('./database/config.js')


//make server of express
const app = express();
app.use(cors())

//use dbConnection
dbConnection()

// can use json from express
app.use(express.json());
app.use(express.static('public'));


app.use('/auth', require('./routes/auth.js'))


//listen to port 4000
app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
})