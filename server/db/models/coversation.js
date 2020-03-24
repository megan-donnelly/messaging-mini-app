const Sequelize = require('sequelize')
const db = require('../db')
const Op = Sequelize.Op
const User = require('./user')
//const Participant = require('./participant')
const Message = require('./message')

const Conversation = db.define('conversation', {
  mostRecent: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Conversation
/**
 * instanceMethods
 */

/**
 * classMethods
 */
Conversation.getMsgThreads = function(userId) {
  // get all convos where user is a participant
  return Conversation.findAll({
    include: [
      {
        model: User,
        through: 'participants',
        as: 'threads',
        where: {
          id: userId
        }
      }
    ]
  })
}

Conversation.getParticipants = function(convoIds) {
  // Get all participants for a set of convo ids
  return Conversation.findAll({
    where: {
      id: {
        [Op.in]: convoIds
      }
    },
    include: [
      {
        model: User,
        through: 'participants',
        as: 'threads',
        attributes: ['id', 'firstName', 'lastName']
      }
    ],
    attributes: ['id', 'updatedAt', 'mostRecent'],
    order: [['updatedAt', 'DESC']]
  })
}

Conversation.getMsgs = function(convoId) {
  return Conversation.findOne({
    where: {
      id: convoId
    },
    include: [
      {
        model: User,
        through: Message,
        as: 'messages',
        attributes: ['id', 'firstName', 'lastName'],
        order: [[Message.updatedAt, 'DESC']]
      }
    ]
  })
}

/**
 * hooks
 */
