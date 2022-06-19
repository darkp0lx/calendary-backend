const mongoose = require('mongoose')
require('dotenv').config()



const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('DB connected')
  } catch (error) {
    console.log(error.message)
  }
}


module.exports = { dbConnection }