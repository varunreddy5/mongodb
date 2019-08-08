const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
  it('requires a user name', () => {
    const user = new User({ name: undefined });
    // When to use validateSync and validate(async validation)
    // When you use validate

    /* 
      user.validate() does result a validationResult as above. Instead we can pass a callback function that will be called with our validation result 

      user.validate((validationResult) => {
        // Here you can do something with the validation result
      });

      The reason we would have a validate function with a callback function is to run any type of asynchronous validation that we might want to have like reaching out to the database or webservice
    */
    const validationResult = user.validateSync();

    const message = validationResult.errors.name.message;
    assert(message === 'Please provide a username')

    /* console.log(validationResult)
      errors:
        { name:
          { ValidatorError: Please provide a username,
            message: Please provide a username
    */
  });

  it('requires a username longer than 2 characters', () => {
    const user = new User({ name: 'Al' });
    const validationResult = user.validateSync();
    const message = validationResult.errors.name.message;
    assert(message === 'Name must be longer than 2 characters');
  });

  it('disallows invalid records to save it into the database', (done) => {
    const user = new User({ name: 'Al' });
    user.save()
      .catch((validationResult) => {
        const message = validationResult.errors.name.message;
        assert(message === 'Name must be longer than 2 characters');
        done();
      });
  });

});