const router = require('express').Router()

const { signup, login, logout } = require('../../controllers/auth')
const {
  usersCtrl: { current, updateSubsctiption },
} = require('../../controllers')

const {
  errorBoundary,
  validateBody,
  authenticate,
} = require('../../middlewares')
const { signUpSignInSchema, subscriptionSchema } = require('../../models/')

router.post('/signup', validateBody(signUpSignInSchema), errorBoundary(signup))

router.post('/login', validateBody(signUpSignInSchema), errorBoundary(login))

router.get('/logout', authenticate, errorBoundary(logout))

router.get('/current', authenticate, errorBoundary(current))

router.patch(
  '/',
  authenticate,
  validateBody(subscriptionSchema),
  errorBoundary(updateSubsctiption)
)

module.exports = router
