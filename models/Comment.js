const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create a Comment model
class Comment extends Model {}

// Define the Comment model
Comment.init(
  {
    // Define an ID field that auto-increments
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define a comment text field
    comment_text: {
      type: DataTypes.STRING,
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
    // Define a post_id field to link to the Post model
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'id',
      },
    },
  },
  {
    sequelize, // Pass the Sequelize instance
    freezeTableName: true, // Don't change the table name
    underscored: true, // Use snake_case for column names
    modelName: 'comment', // Name the model 'comment'
  }
);

module.exports = Comment; // Export the Comment model
