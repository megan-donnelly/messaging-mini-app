const router = require('express').Router()
const {Conversation, User, Participant} = require('../db/models')
module.exports = router

// GET /api/conversations
// Grabs all message threads for a user
router.get('/', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id)
    if (user) {
      let conversations = await Conversation.getMsgThreads(user.id)
      //let conversations = await user.getThreads()
      res.send(conversations)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

// GET /api/conversations/:conversationId
router.get('/:conversationId', async (req, res, next) => {
  try {
    const messages = await Conversation.getMsgs(req.params.conversationId)
    if (messages) res.send(messages)
    else res.sendStatus(404)
  } catch (error) {
    next(error)
  }
})
