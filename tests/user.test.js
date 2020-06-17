const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/user')

const userOneId = new mongoose.Types.ObjectId()

const userOne = {
  _id: userOneId,
  name: 'mike',
  email: 'mike@mike.com',
  password: 'MyPass567!',
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
}

beforeEach(async () => {
  await User.deleteMany()
  await new User(userOne).save()
})

test('Should sign up a new user', async () => {
  const response = await request(app)
    .post('/users')
    .send({
      name: 'ian',
      email: 'ian@ian.com',
      password: 'MyPass77',
    })
    .expect(201)

  const user = await User.findById(response.body.user._id)
  expect(user).toMatchObject({
    name: 'ian',
    email: 'ian@ian.com',
  })
  expect(user.password).not.toBe('MyPass77')
})

test('should login existing user', async () => {
  const response = await request(app)
    .post('/users/login')
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200)
  const user = await User.findById(userOne._id)
  expect(response.body.token).toBe(user.tokens[1].token)
})

test('should not login unknown user', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: userOne.email,
      password: 'wrongpassword',
    })
    .expect(400)
})

test('Should get profile for user', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('Should NOT get profile for unauthenticated user', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer notavalidtoken`)
    .send()
    .expect(401)
})

test('Should delete account for user', async () => {
  await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

  const user = await User.findById(userOneId)
  expect(user).toBe(null)
})

test('Should NOT delete account for user', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer notavalidtoken`)
    .send()
    .expect(401)
})
