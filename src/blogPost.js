const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
  title: String,
  content: String,
  comments: [{
    // Here in this object, we specify the type is going to point off to a record that is sitting in a different collection, so we're not resting documents here, we are passing a reference off to another model sitting in comments collection
    type: Schema.Types.ObjectId,
    ref: 'comment' // this reference is taken from mongoose.model('comment', CommentSchema);
  }]
});

const BlogPost = mongoose.model('blogPost', BlogPostSchema);
module.exports = BlogPost;