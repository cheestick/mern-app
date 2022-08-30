const router = require('express').Router()

const { register, login, logout } = require('../../controllers/auth')

const {
  errorBoundary,
  validateBody,
  authenticate,
} = require('../../middlewares')
const { signUpSignInSchema } = require('../../models/')

router.post(
  '/register',
  validateBody(signUpSignInSchema),
  errorBoundary(register)
)
router.post('/login', validateBody(signUpSignInSchema), errorBoundary(login))
router.get('/logout', authenticate, errorBoundary(logout))

module.exports = router
