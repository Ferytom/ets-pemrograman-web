import mongoose, { Types } from 'mongoose'

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  name: String,
  creator: { type: Types.ObjectId, ref: 'User' },
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
})

const PostMessage = mongoose.model('PostMessage', postSchema)

export default PostMessage
