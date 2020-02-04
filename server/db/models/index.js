const User = require('./user')
const Message = require('./message')
const Conversation = require('./coversation')
const Participant = require('./participant')

/* Associations for Models */

// Participant Through Table
User.belongsToMany(Conversation, {through: Participant, as: 'threads'})
Conversation.belongsToMany(User, {through: Participant, as: 'participants'})

// Messages Through Table
User.belongsToMany(Conversation, {through: Message, as: 'messages'})
Conversation.belongsToMany(User, {through: Message, as: 'messages'})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Message,
  Conversation,
  Participant
}
