import request from 'supertest-as-promised'
import express from '../../services/express'
import routes, { Articles } from '.'

const app = () => express(routes)

let articles

beforeEach(async () => {
  articles = await Articles.create({})
})

test('POST /article 201', async () => {
  const { status, body } = await request(app())
    .post('/')
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
})

test('GET /article 200', async () => {
  const { status, body } = await request(app())
    .get('/')
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /article/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/${articles.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(articles.id)
})

test('GET /article/:id 404', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /article/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`/${articles.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(articles.id)
})

test('PUT /article/:id 404', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
  expect(status).toBe(404)
})

test('DELETE /article/:id 204', async () => {
  const { status } = await request(app())
    .delete(`/${articles.id}`)
  expect(status).toBe(204)
})

test('DELETE /article/:id 404', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
  expect(status).toBe(404)
})
