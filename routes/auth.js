//get feature ROUTER
const { Router } = require('express')
const { createUser, loginUser, revalidToken } = require('../controllers/auth.js')

const { check } = require('express-validator')
const { validInput } = require('../middlewares/valid-input.js')
const { validJWT } = require('../middlewares/valid-jwt.js')
//init router
const router = Router()


router.post('/register', [
  //middleware's
  check('name', 'the name is required').not().isEmpty(),
  check('email', 'the email is required').isEmail(),
  check('password', 'the password is required').not().isEmpty(),
  check('password', 'the password must be at least 6 characters').isLength({ min: 6 }),
  validInput
], createUser)

router.post('/login',
  [
    check('email', 'the email is required').isEmail(),
    check('password', 'the password is required').not().isEmpty(),
    check('password', 'the password must be at least 6 characters').isLength({ min: 6 }),
    validInput
  ], loginUser)

router.get('/renew', validJWT, revalidToken)


module.exports = router
