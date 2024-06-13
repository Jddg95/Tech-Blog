const { disable } = require('colors');
const Sequelize = require('sequelize'); // imports sequelize library 
require('dotenv').config(); // loads env variables from .env file 

let sequelize; // holds connection the database 

// if there is a DB_URL setting the .env file, use it to connect 
if (process.env.DB_URL) {
    sequelize = new Sequelize(process.env.DB_URL)
} else {
    // otherwise, use individual variables 
    sequelize = new Sequelize(
        process.env.DB_NAME, // Database name 
        process.env.DB_USER, // Database username 
        process.env.DB_PASSWORD, // Databse password 
        {
            host: 'localhost', // Where the databse is located 
            dialect: 'postgres', // Type of database connecting to 
        },
    );
}

//exporting the connection 
module.exports = sequelize;