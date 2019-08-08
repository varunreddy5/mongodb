const mongoose = require('mongoose');
const PostSchema = require('./post');
// helps in creating schema model for our User model. It says that 'I expect the model to have name property and it is of type string
const Schema = mongoose.Schema;

// Now create a User Schema
const UserSchema = new Schema({
  // use object if you have multiple properties
  name: {
    type: String,
    // We must pass a validate property. It should point out an object that has a validator function and a message to show if the record is invalid
    validate: {
      validator: (name) => {
        return name.length > 2
      },
      message: 'Name must be longer than 2 characters'
    },
    // array contains boolean value and the message when error occurs
    required: [true, 'Please provide a username']
  },
  postCount: Number,
  posts: [PostSchema]
  // User has many posts. We shouldn't create a seperate model as we do in SQL.

  /* Solution */
  // In mongoose a more reasonable type of data structure might be rather than a seperate collection of users and seperate collection of posts would be instead to still have a single collection of users and then inside of a user model we could have a list of different posts that belong to them.

  /* User 
    name: 'joe'
    posts
    */

  // this concept of nesting records or nesting assosciations rather than spinning off completely new collections is at the core of what makes Mongo

  /* User Model
    user schema               post schema
    name                        title
    postCount
    post post post
    */
  // Important: We will not make a post model instead we will make only a post schema. The reason is that we only create mongoose models to correspond to a collection of records inside of our database because these posts are not represented by a standalone collection, we're not going to make a post model. We will make only a post schema

  // In mongo world this idea of embedding one resource inside another is referred as sub documents. User -> document, post -> sub document
});

// User model represents the entire collection of data in our database, schema is just a very small component of our model. Schema just tells what kind of properties that the model to have and the type of those properties

// Now create User Model which should use User schema. 'User' here is a class and represents entire collection of data
const User = mongoose.model('user', UserSchema);

module.exports = User; // If any file needs User model