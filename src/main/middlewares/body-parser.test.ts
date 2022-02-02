import request from 'supertest'
import app from '../config/app'

describe('Body Parser Middleware', () => {
  test('Should parse body as json', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send({ name: 'Gabriel' })
    })

    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Gabriel' })
      .expect(200, { name: 'Gabriel' })
  })
})
