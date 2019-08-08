const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
  let joe, blogPost, comment;
  beforeEach((done) => {
    joe = new User({ name: 'joe' });
    blogPost = new BlogPost({ title: 'post five', content: 'Great content' });
    comment = new Comment({ content: 'Nice post Joe' });

    // inside the hood mongoose will only take the objectId
    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    // we have to save everything at once. Takes an array of promises and combines them into one promise
    Promise.all([joe.save(), blogPost.save(), comment.save()])
      .then(() => done());
  });

  it('it saves a relation between a user and a blogPost', (done) => {
    /* modifier enhance the query in some way, here are populating blogpost and populate is the modifier */
    User.findOne({ name: 'joe' })
      .populate('blogPosts')
      .then((user) => {
        assert(user.blogPosts[0].title === 'post five');
        done();
      });
  });
  // Loading deeply nested associations like loading all the comments
  it('save a complete relation tree', (done) => {
    User.findOne({ name: 'joe' })
      .populate({
        // The first path says that in that user find the blogPost property and load all the assosciated blogposts then the populate option means inside the blogposts you just fetched find the comments property and attempt to load up all the associated comments
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then((user) => {
        assert(user.name === 'joe');
        assert(user.blogPosts[0].title === 'post five');
        assert(user.blogPosts[0].comments[0].content === 'Nice post Joe');

        assert(user.blogPosts[0].comments[0].user.name === 'joe');
        done();
      });
  });
});