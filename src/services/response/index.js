export const success = (res, status) => (entity) => {
  if (entity) {
    res.status(status || 200).json(entity)
  }

  return null
}

export const notFound = (res, { code, message }) => (entity) => {
  if (entity) {
    return entity
  }
  code = code || 'not found'
  message = message || 'not found'

  res.status(404).json({code, message}).end()
  return null
}

export const authorOrAdmin = (res, user, userField) => (entity) => {
  if (entity) {
    const isAdmin = user.role === 'admin'
    const isAuthor = entity[userField] && entity[userField].equals(user.id)
    if (isAuthor || isAdmin) {
      return entity
    }
    res.status(401).end()
  }
  return null
}
