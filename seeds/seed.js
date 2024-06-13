const sequelize = require("../config/connection");
const { User, Post } = require("../models");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Create users
  const users = await User.bulkCreate(
    [
      { username: "User1", password: "password123" },
      { username: "User2", password: "password123" },
      { username: "User3", password: "password123" },
    ],
    {
      individualHooks: true,
      returning: true,
    }
  );

  // Create posts
  const posts = await Post.bulkCreate([
    {
      title: "Why MVC is so important",
      content:
        "MVC allows developers to maintain a true separation of concerns, devising their code between the Model layer for data, the View layer for design, and the Controller layer for application logic.",
      user_id: users[0].id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Authentication vs. Authorization",
      content:
        "There is a difference between authentication and authorization. Authentication means confirming your own identity, whereas authorization means being allowed access to the system.",
      user_id: users[1].id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Object-Relational Mapping",
      content:
        "I have really loved learning about ORMs. It has really simplified the way I create queries in SQL!",
      user_id: users[2].id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  process.exit(0);
};

seedDatabase();
