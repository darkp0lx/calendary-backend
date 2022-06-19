const bcrypt = require('bcrypt')
const { response } = require('express')
const { generateJWT } = require('../helpers/jwt')

const User = require('../models/User')

const createUser = async (req, res = response) => {

  const { name, email, password } = req.body
  const newUser = new User(req.body)

  try {
    const user = await User.findOne({ email })
    if (user) {
      res.status(400).json({
        ok: false,
        msg: 'user with that email, already exists'
      })
    } else {
      //bcrypt password
      const salt = await bcrypt.genSaltSync()
      newUser.password = await bcrypt.hashSync(password, salt)

      //jwt token
      const token = await generateJWT(newUser._id, newUser.name)

      //save user
      await newUser.save()

      res.status(201).json({
        new: true,
        msg: "create new user",
        user: {
          name,
          email,
          uid: newUser._id
        },
        token
      })
    }

  } catch (err) {
    res.status(500).json({
      error: true,
      msg: err.message
    })
  }


}


const loginUser = async (req, res = response) => {

  const { email, password } = req.body

  const user = await User.findOne({ email })
  try {
    if (!user) {
      res.status(400).json({
        ok: false,
        msg: 'user does not exist'
      })
    } else {
      const validPassword = await bcrypt.compareSync(password, user.password)
      const token = await generateJWT(newUser._id, newUser.name)
      if (!validPassword) {
        res.status(400).json({
          ok: false,
          msg: 'invalid password'
        })
      } else {
        res.json({
          ok: true,
          msg: 'login success',
          user: {
            name: user.name,
            email: user.email,
            uid: user._id
          },
          token
        })
      }
    }
  } catch (error) {
    console.log(error.message)
  }

  res.json({
    new: true,
    msg: "login user"
  })
}


const revalidToken = async (req, res) => {
  console.log(req.decoded)
  const { uid, name } = req.decoded
  const token = await generateJWT(uid, name)

  res.json({
    ok: true,
    msg: "token renew",
    token
  })
}

module.exports = {
  createUser,
  loginUser,
  revalidToken
}