const jwt = require('jsonwebtoken')

const generateJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name }
    jwt.sign(payload, process.env.KEY_JWT_SEED, { expiresIn: '2h' }, (err, token) => {
      if (err) reject(err)
      console.log(token, "this is token")
      resolve(token)
    })
  })
}

module.exports = { generateJWT }