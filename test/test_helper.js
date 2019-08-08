// mocha starts
// tell mongoose to connect to mongo

// ... wait ...

// mongoose connects to mongo
// connection successfull? Run Tests
// Failed? Show Error

const mongoose = require('mongoose');
// A reference to ES6 Promises since mongoose uses an older version of promises which throws a warning
mongoose.Promise = global.Promise;

// For whatever reason if it takes longer than expected time to connect to mongo and may be the test suite mocha runs tests too soon. We're going to wrap our connection statement with a 'before' call

// The difference between 'before' and 'beforeEach' is that 'before' is executed only one time for all of your tests and 'beforeEach' runs for every test present
before((done) => {
  // If it is a remote server change localhost to some remote IP address. Also it will automatically create users_test database without creating it explicitly
  mongoose.connect('mongodb://localhost/users_test', { useNewUrlParser: true });
  // To know whether the connection is successfull or not
  mongoose.connection
    .once('open', () => {
      console.log("Connection Opened");
      done();
    }) // watch for mongoose to emit an event called open one time, run the func.
    .on('error', (error) => {
      console.log('Warning: ', error);
    });
});

/* Mongoose models */

// In this we use mongoose to create a new collection(i.e.,the collection of users) in the database

// We use mongoose to create User model in which all records sits in. We use user model to create instances of User model that represents a single user

// User model has a very important property to them called schema, which tells us what properties we expect each record in the collection it to be and what type of data it contains

/* Below is the code to run delete the records in User collection before we run other tests */

// Inorder to deal with the duplicates, we need to make sure that we need to do some cleanup every single time we run any test inside our test suite.

/* Implementation

// Mocha Starts
// Empty Database
// Test #1
// Empty Database
// Test #2
// Empty Database

// Every test will run in isolation. Do it in test_helper.js
*/

// beforeEach is a hook. A hook is a function that will be executed before any test gets executed inside our test suite  
beforeEach((done) => {
  /* We need to drop all the collections. All the names should be lowercase */
  const { users, comments, blogposts } = mongoose.connection.collections;
  // So now the challenge is inside of this function we need to somehow find our collection of users and drop all of the records inside it.

  // Mongoose gives a nice handler for that

  // One detail. Whenever mongoose starts to reach out mongo, it takes a little bit of time for the connect statements to appear. The same applied to every single operation we take on collection as well.

  // So we need to pause other tests before this is complete

  /* Implementation*/

  // beforeEach
  // start long running process
  // call 'done' callback
  // tests continue running
  // mongoose.connection.collections.users.drop(() => {
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done();
      });
    });
  })
  // this is a callback function which gets executed once all the users are completely dropped

  // Ready to run next test

  // Next is 'done' callback, every single function that we write inside of mocha, gets a 'done' callback

  // Tells that everything inside beforeEach is done executing
  // done();

  // });
});