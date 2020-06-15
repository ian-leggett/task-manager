const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

const userOne = {
  name: 'mike',
  email: 'mike@mike.com',
  password: 'MyPass567!',
}

const userTwo = {
  name: 'luke',
  email: 'luke@luke.com',
  password: 'MyPass567!',
}

beforeEach(async () => {
  await User.deleteMany()
  await new User(userOne).save()
})

test('Should sign up a new user', async () => {
  await request(app)
    .post('/users')
    .send({
      name: 'ian',
      email: 'ian@ian.com',
      password: 'MyPass77',
    })
    .expect(201)
})

test('should login existing user', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200)
})

test('should not login unknown user', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: userTwo.email,
      password: userTwo.password,
    })
    .expect(400)
})
