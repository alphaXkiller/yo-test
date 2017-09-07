import { Router } from 'express'
import { middleware as query } from 'querymen'
import {
  param,
  create,
  index,
  show,
  update,
  destroy,
  addComment,
} from './controller'
export Articles, { schema } from './model'

const router = new Router()

router.param('id', param)
/**
 * @api {post} /article Create articles
 * @apiName CreateArticles
 * @apiGroup Articles
 * @apiSuccess {Object} articles Articles's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Articles not found.
 */
router.post('/',
  create)

/**
 * @api {get} /article Retrieve articles
 * @apiName RetrieveArticles
 * @apiGroup Articles
 * @apiUse listParams
 * @apiSuccess {Object[]} articles List of articles.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /article/:id Retrieve articles
 * @apiName RetrieveArticles
 * @apiGroup Articles
 * @apiSuccess {Object} articles Articles's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Articles not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /article/:id Update articles
 * @apiName UpdateArticles
 * @apiGroup Articles
 * @apiSuccess {Object} articles Articles's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Articles not found.
 */
router.put('/:id',
  update)

/**
 * @api {delete} /article/:id Delete articles
 * @apiName DeleteArticles
 * @apiGroup Articles
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Articles not found.
 */
router.delete('/:id',
  destroy)


router.post('/:id/comment', addComment)

export default router
