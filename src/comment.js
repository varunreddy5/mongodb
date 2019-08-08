const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user' // this reference is taken from mongoose.model('user', UserSchema)
  }
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;