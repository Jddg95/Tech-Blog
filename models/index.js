const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// Define associations

// A user can have many posts
User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// A post belongs to a user
Post.belongsTo(User, {
  foreignKey: "user_id",
});

// A comment belongs to a user
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

// A comment belongs to a post
Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

// A user can have many comments
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// A post can have many comments
Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

// Export models
module.exports = { User, Post, Comment };
