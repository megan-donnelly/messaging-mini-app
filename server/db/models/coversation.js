const Sequelize = require('sequelize')
const db = require('../db')
const Op = Sequelize.Op
const User = require('./user')
const Participant = require('./participant')
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
  return Conversation.findAll({
    include: [
      {
        model: User,
        through: Participant,
        as: 'participants',
        attributes: ['id', 'firstName', 'lastName'],
        where: {
          id: {
            [Op.ne]: [userId]
          }
        }
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
