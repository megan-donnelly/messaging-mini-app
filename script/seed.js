'use strict'

const db = require('../server/db')
const {
  Conversation,
  User,
  Message
  //Participant
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const conversations = [{id: 1}, {id: 2}, {id: 3}]

  const users = [
    {
      email: 'cody@email.com',
      password: '123',
      firstName: 'Cody',
      lastName: 'Carr'
    },
    {
      email: 'murphy@email.com',
      password: '123',
      firstName: 'Murphy',
      lastName: 'Mulligan'
    },
    {
      email: 'bob@email.com',
      password: '123',
      firstName: 'Bob',
      lastName: 'Barnes'
    },
    {
      email: 'john@email.com',
      password: '123',
      firstName: 'John',
      lastName: 'Jacobs'
    },
    {
      email: 'jill@email.com',
      password: '123',
      firstName: 'Jill',
      lastName: 'Johnson'
    },
    {
      email: 'sally@email.com',
      password: '123',
      firstName: 'Sally',
      lastName: 'Smith'
    }
  ]
  /*
  const participants = [
    {userId: 1, conversationId: 1},
    {userId: 2, conversationId: 1},
    {userId: 3, conversationId: 1},
    {userId: 5, conversationId: 2},
    {userId: 3, conversationId: 2},
    {userId: 2, conversationId: 2},
    {userId: 6, conversationId: 3},
    {userId: 3, conversationId: 3},
    {userId: 2, conversationId: 3}
  ]
*/
  const messages = [
    {content: 'how was your day?', userId: 1, conversationId: 1},
    {content: 'do you want to run?', userId: 2, conversationId: 1},
    {content: 'lets run in central park', userId: 3, conversationId: 1},
    {content: 'Can we reschedule our run?', userId: 2, conversationId: 2},
    {content: `I'm on my way!`, userId: 6, conversationId: 3},
    {content: 'See you soon!', userId: 3, conversationId: 3},
    {content: 'Hey! Meet at 2?', userId: 2, conversationId: 3}
  ]

  const convo1 = await Conversation.create(conversations[0])
  const convo2 = await Conversation.create(conversations[1])
  const convo3 = await Conversation.create(conversations[2])

  const user1 = await User.create(users[0])
  const user2 = await User.create(users[1])
  const user3 = await User.create(users[2])
  const user4 = await User.create(users[3])
  const user5 = await User.create(users[4])
  const user6 = await User.create(users[5])

  const msg1 = await Message.create(messages[0])
  const msg2 = await Message.create(messages[1])
  const msg3 = await Message.create(messages[2])
  const msg4 = await Message.create(messages[3])
  const msg5 = await Message.create(messages[4])
  const msg6 = await Message.create(messages[5])
  const msg7 = await Message.create(messages[6])

  await user1.addThread(convo1)
  await user2.addThreads([convo1, convo2, convo3])
  await user3.addThreads([convo1, convo2, convo3])
  await user4.addThread(convo1)
  await user5.addThread(convo2)
  await user6.addThread(convo3)

  //const createdConversations = await Conversation.bulkCreate(conversations)
  //const createdUsers = await User.bulkCreate(users)
  //const createdParticipants = await Participant.bulkCreate(participants)
  //const createdMessages = await Message.bulkCreate(messages)

  //console.log(`seeded ${createdConversations.length} conversations`)
  //console.log(`seeded ${createdUsers.length} users`)
  // console.log(`seeded ${createdParticipants.length} participants`)
  //console.log(`seeded ${createdMessages.length} messages`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
