const { validationResult } = require("express-validator")

const validInput = (req, res, next) => {

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: true,
      msg: errors.mapped()
    })
  }
  next()
}

module.exports = { validInput }