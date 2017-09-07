import mongoose, { Schema } from 'mongoose'

const MODEL_NAME = 'Articles'

const articlesSchema = new Schema(
  {
    author: String,
    title: String,
    content: String,
    votes_up: { type: Number, default: 0 },
    votes_down: { type: Number, default: 0 },
    comments: [{
      editor: String,
      comment: String,
      created_at: { type: Date, default: new Date() }
    }],
    created_at: Date,
    updated_at: Date,
    deleted_at: { type: Date, default: null },
  },
  {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
  }
)

articlesSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      author: this.author,
      title: this.title,
      content: this.content,
      votes_up: this.votes_up,
      votes_down: this.votes_down,
      comments: this.comments,
      created_at: this.created_at,
      updated_at: this.updated_at,
      deleted_at: this.deleted_at,
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  },
  softDelete() {
    return this
      .model(MODEL_NAME)
      .findByIdAndUpdate(
        this._id,
        { deleted_at: new Date},
        { new: true }
      )
  },
  addComment({editor, comment}) {
    return this
      .model(MODEL_NAME)
      .findByIdAndUpdate(
        this._id,
        { $push: { comments: {editor, comment} } },
        { new: true }
      )
  }
}

const model = mongoose.model('Articles', articlesSchema)

export const schema = model.schema
export default model
