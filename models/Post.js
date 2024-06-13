const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create a Post model
class Post extends Model {}

// Define the Post model
Post.init(
  {
    // Define an ID field that auto-increments
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define a title field
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Define a content field
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Define a user_id field to link to the User model
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize, // Pass the Sequelize instance
    freezeTableName: true, // Don't change the table name
    underscored: true, // Use snake_case for column names
    modelName: 'post', // Name the model 'post'
  }
);

module.exports = Post; // Export the Post model
