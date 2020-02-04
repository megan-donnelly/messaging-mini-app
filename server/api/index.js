const router = require('express').Router()
const {isUser} = require('../../utils')
module.exports = router

router.use('/users', isUser, require('./users'))
router.use('/conversations', isUser, require('./conversations'))
router.use('/messages', isUser, require('./messages'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
