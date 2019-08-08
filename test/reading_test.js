const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
  // We have used 'let' to reference it inside all our blocks in this function
  let varun;
  // Before going to the 'it' block we actually don't have any records in our users collection to search for, so we have to make sure that we have a record inside. For that create one
  beforeEach((done) => {
    varun = new User({ name: 'Mark' });
    varun.save()
      .then(() => done());
  });
  it('finds all users with a name mark', (done) => {
    // 'find' returns an array while 'findOne' returns the first match.

    // In mongoose, even when we created a User before saving into the database it is automatically assigned an ID by mongoose. This ID will be identical with the ID which will be saved in the database
    User.find({ name: 'Mark' })
      .then((users) => {
        // If you observe Robo 3T we can see that the ID is an object and === doesn't work on the object. To compare them we need to convert it into string
        assert(users[0]._id.toString() === varun._id.toString());
        done();
      });
  });

  it('finds user with a particular ID', (done) => {
    User.findOne({ _id: varun._id })
      .then((user) => {
        assert(user.name === 'Mark');
        done();
      });
  })
});