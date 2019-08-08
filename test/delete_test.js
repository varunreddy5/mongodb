const assert = require('assert');
const User = require('../src/user');
const mongoose = require('mongoose');
// To remove deprecated warning
mongoose.set('useFindAndModify', false);
/* Model Class 'User' */
// remove
// findOneAndRemove
// findByIdAndRemove

/* Model Instance 'varun' */
// remove
describe('Deleting a user', () => {
  let varun;
  beforeEach((done) => {
    joe = new User({ name: 'joe' });
    joe.save()
      .then(() => done());
  });
  // joe.deleteOne()
  // Then when joe is gone, then try to find a user with a name of 'joe'
  // Then assert that the query did not find a user
  it('model instance remove', (done) => {
    joe.deleteOne() // returns a promise
      .then(() => User.findOne({ name: 'joe' })) // returns one more promise
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method remove', (done) => {
    // Remove bunch of records with some given criteria
    User.deleteOne({ name: 'joe' })
      .then(() => User.findOne({ name: 'joe' })) // returns one more promise
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method findOneAndRemove', (done) => {
    User.findOneAndRemove({ name: 'joe' })
      .then(() => User.findOne({ name: 'joe' })) // returns one more promise
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method findByIdAndRemove', (done) => {
    User.findByIdAndRemove({ _id: joe._id })
      .then(() => User.findOne({ name: 'joe' })) // returns one more promise
      .then((user) => {
        assert(user === null);
        done();
      });
  });
});