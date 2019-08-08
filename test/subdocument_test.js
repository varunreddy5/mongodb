const assert = require('assert');
const User = require('../src/user');

describe('Sub Documents', () => {
  it('can create a sub document', (done) => {
    // Here we'll try to create a user with a nested post and you have to save it to the database and I want to fetch that record to make sure that the post actually saved in database

    const joe = new User({
      name: 'joe',
      posts: [{ title: 'post one' }]
    });
    joe.save()
      .then(() => User.findOne({ name: 'joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'post one');
        done();
      });
  });

  it('can add subdocuments to an existing record', (done) => {
    /*  create joe
        save joe
        fetch joe
        add a post to joe
        save joe
        fetch joe
        make assertion
    */

    // We can't create a post and save it, we have to save the entire model

    const joe = new User({ name: 'joe', posts: [] });
    joe.save()
      // If we omit the curly braces after the fat arrow, we get an implicit return of whatever is inside of the arrow function
      .then(() => User.findOne({ name: 'joe' }))
      .then((user) => {
        user.posts.push({ title: 'post two' });
        return user.save(); // though this is similar to joe.save() and their we are directly using .then() without any return
        // .save() will give a promise and it is not returned so we have to return to use .then()
      })
      .then(() => User.findOne({ name: 'joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'post two');
        done();
      });
  });

  it('remove an existing sub document', (done) => {
    const joe = new User({
      name: 'joe',
      posts: [{ title: 'post three' }]
    });
    joe.save()
      .then(() => User.findOne({ name: 'joe' }))
      .then((user) => {
        // instead of finding the index and using splice mongoose provides an api for that
        user.posts[0].remove();
        return user.save();

      })
      .then(() => User.findOne({ name: 'joe' }))
      .then((user) => {
        assert(user.posts.length === 0);
        done();
      });
  });
});