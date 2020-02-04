const Sequelize = require('sequelize')
const db = require('../db')
const Conversation = require('./coversation')
const User = require('./user')

const Message = db.define('message', {
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Message
/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */
