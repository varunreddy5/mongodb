/* Model Class */
//update
//findOneAndUpdate
//findByIdAndUpdate

/* Model Instance */
//update
// set and save

const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'joe' });
    joe.save()
      .then(() => done());
  });
  // To remove redundancy
  function assertName(operation, done) {
    operation
      .then(() => User.find({ name: 'alex' }))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'alex');
        done();
      });
  }
  it('instance type using set and save', (done) => {
    // We have to use 'set' to update a property
    joe.set('name', 'alex');
    assertName(joe.save(), done);
  });

  it('instance type using update', (done) => {
    assertName(joe.updateOne({ name: 'alex' }), done);
  });

  it('class type using update', (done) => {
    // first argument is to find the record then second argument is to update the record
    assertName(User.updateOne({ name: 'joe' }, { name: 'alex' }), done);
  });

  // Advance update operators

  /* unoptimal solution */
  // Fetch the record and load it up the server
  // Increment and save to the database

  // Fetching the data to the server is not the optimal solution

  /* optimal solution */
  // Find the users, update postCount by 1 without fetching to the server

  // Topic: mongo update operators

  // this test was used when postCount was a property instead of a virtual type

  // it('A user can have the post count incremented by 1', (done) => {
  //   User.updateOne({ name: 'joe' }, { $inc: { postCount: 1 } })
  //     .then(() => User.findOne({ name: 'joe' }))
  //     .then((user) => {
  //       assert(user.postCount === 1);
  //       done();
  //     });
  // });
});