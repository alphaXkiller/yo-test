import _ from 'lodash'
import mongoose from 'mongoose'
import { success, notFound } from '../../services/response/'
import { Articles } from '.'

export const param = (req, res, next, id) => {
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    res
      .status(400)
      .json({
        code: 'Invalid Id',
        message: 'id must be a single string of 12 bytes'
      })
      .end()

    return null
  }

  return Articles
    .findById(id)

    .then(article => {
      if (!article || article.deleted_at)
        return notFound(res, { message: `id(${id}) not found` })()
      else {
        req.state = {article}
        return next()
      }
    })
}

export const create = ({ body }, res, next) =>
  Articles.create(body)
    .then((articles) => articles.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Articles.find(query, select, cursor)
    .then((articles) => articles.map((articles) => articles.view()))
    .then(success(res))
    .catch(next)

export const show = ({ state }, res, next) =>
  res.json(state.article.view())

export const update = ({ state, body, params }, res, next) =>
  _.merge(state.article, body)
    .save()
    .then(article => article.view())
    .then(success(res))
    .catch(next)

export const destroy = ({ state }, res, next) =>
  state.article
    .softDelete()
    .then(success(res, 204))
    .catch(next)

export const addComment = ({state, body}, res, next) =>
  state.article
    .addComment({
      editor: body.editor,
      comment: body.comment
    })
    .then(success(res))
    .catch(next)
