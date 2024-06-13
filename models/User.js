const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Define the User model
User.init(
  {
    // Define an ID field that auto-increments
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define a username field
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // Define a password field
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    sequelize, // Pass the Sequelize instance
    timestamps: false, // Don't add timestamp fields
    freezeTableName: true, // Don't change the table name
    underscored: true, // Use snake_case for column names
    modelName: "user", // Name the model 'user'
  }
);

module.exports = User; // Export the User model
