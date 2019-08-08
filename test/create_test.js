// To test whether we can create an insert a record into the collection

/* A bit about mocha and its structure */

// At the very top level of our test file, we are going to have what we refer to as 'describe' function or block. 

// Inside that function we're going to have a variety of 'it' blocks or functions. Inside of this 'it' function we'll put in a little bit of syntax or code to test a very specific part of the code that we have in our 'User' model. 

// Both 'describe' and 'it' are automatically provided by the mocha
const assert = require('assert');
const User = require('../src/user');
// The 'it' block knows that the user is trying to run some time of functions inside it
// Inside of every it function we need to make an assertion(this value === this value)

// 'npm run test' for running test files
describe('Creating records', () => {
  // Creating a user and saving it to the database
  it('saves a user', (done) => {
    // Create the user
    // Save it
    // Check whether we're saving it into the database
    const varun = new User({ name: 'Mark' });
    // Whenever a record is saved in the database it assigns an 'id' to it which is wrapped in ObjectId

    // Also if you run the tests twice a duplicate record is created in the collections

    // Since it takes some amount of time to save 'varun', since the database calls are always asynchronous in nature, the save call will return a promise when the promise resolves
    varun.save()
      .then(() => {
        // Has mark been saved successfully?

        // Whenever we created a new instance of a model and it's just sitting inside of mocha and if it hasn't been saved yet, mongoose places a flag on the instance of the model called 'isNew'. isNew is true if instance is not yet been saved and viceversa
        assert(!varun.isNew);
        // Last thing we need to do is to call 'done' callback to pause until this is completed execution
        done();
      });
  });
});


