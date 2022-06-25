const jwt = require('jsonwebtoken')

const validJWT = (req, res, next) => {
  const token = req.header('x-access-token')

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'token not found'
    })
  } else {
    jwt.verify(token, process.env.KEY_JWT_SEED, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          ok: false,
          msg: 'invalid token'
        })
      }
      req.decoded = decoded
      next()
    })
  }
}

module.exports = { validJWT }