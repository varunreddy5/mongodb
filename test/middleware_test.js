const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
  let joe, blogPost;
  beforeEach((done) => {
    joe = new User({ name: 'joe' });
    blogPost = new BlogPost({ title: 'post five', content: 'Great content' });

    // inside the hood mongoose will only take the objectId
    joe.blogPosts.push(blogPost);

    // we have to save everything at once. Takes an array of promises and combines them into one promise
    Promise.all([joe.save(), blogPost.save()])
      .then(() => done());
  });

  it('removes blogposts once the user is removed', (done) => {
    joe.remove()
      .then(() => {
        // It's an asynchronous call since it has to go to database to count the number of documents in the collection
        return BlogPost.countDocuments()
      })
      .then((count) => {
        assert(count === 0);
        done();
      });
  });

});