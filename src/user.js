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
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }],
  posts: [PostSchema] /* Ignore this */ /* look down for more code */
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
UserSchema.virtual('postCount').get(function () {
  // we still have to tell it what to do whenever a user actually accesses this thing, so we'll be using a function instead of a fat arrow. 

  // the virtual properties work by using getter and setter features of ES6 whenever we define a getter with a virtual property postCount instead of just giving out the value of postCount mongoose and javascript are going to work together to very quickly run the function the we define inside that function we weill return the computed value

  // console.log(this); Returns the instance of User model. That's why we use function instead of fat arrow since function refers the whole file instead
  return this.posts.length;
});
/* Regarding postCount */

// So postCount before is a number and it's supposed to reflect the number of posts that the user has. But it is upto the developer to keep track of both post count and posts and also we have to manually increment postCount whenever we add a new post.

// So we're going to use an idea called Virtual types inside of mongoose.

// Definition: A virtual type is ny field on a model like postCount in our case that does not get persisted over to our mongoDB we instead define the postCount property on our server so anytime we try to access this post count we will calculate the number of posts we have by just looking at the length of the array and then we return that number

// About middleware in app.js
UserSchema.pre('remove', function (next) {
  // ideally we would say just BlogPost.remove and something something. But this may not work sometimes. Here's why...

  // If I make a direct reference to blog post right here by loading up by using require but the problem is, if the blogPost model also requires User then there will be a deadlock cycle which to open first. So it;s better to just completely avoid this type of situation and load up here. Because this function runs only when there is an event by that time everything will be completely loaded up.

  const BlogPost = mongoose.model('blogPost');
  // this === joe
  // keep in mind we have to remove the posts associated with the particular user. The basic approach is to iterate through all the blog posts and if the post id is present in this.blogposts array then remove it.

  // To avoid such complex situation mongoose provides a build in operator similar to $inc such as $in

  BlogPost.remove({ _id: { $in: this.blogPosts } })
    .then(() => next());
  // Implies go through all the blogposts. Look at all their ids. If the ID is in the list right here go ahead and remove it

  // Also we have to make sure that the entire middleware is executed before our record is actually removed, so to accomodate that we use next()



});


const User = mongoose.model('user', UserSchema);

module.exports = User; // If any file needs User model