import { Articles } from '.'

let articles

beforeEach(async () => {
  articles = await Articles.create({})
})

describe('view', () => {
  it('returns simple view', () => {
    const view = articles.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(articles.id)
    expect(view.created_at).toBeTruthy()
    expect(view.updated_at).toBeTruthy()
  })

  it('returns full view', () => {
    const view = articles.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(articles.id)
    expect(view.created_at).toBeTruthy()
    expect(view.updated_at).toBeTruthy()
  })
})
