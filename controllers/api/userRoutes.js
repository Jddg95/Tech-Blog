const router = require("express").Router();
const { User } = require("../../models");
const bcrypt = require("bcrypt");

// Route to handle user login
router.post("/login", async (req, res) => {
  try {
    // Find the user by their username
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    // Check if the password is valid
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    // Save the user session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to handle user signup
router.post("/signup", async (req, res) => {
  try {
    // Create a new user
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10), // Hash the password before saving
    });

    if (!userData) {
      return res.status(400).json({ message: "Failed to create user" });
    }

    // Save the user session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res
        .status(200)
        .json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to handle user logout
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    // Destroy the user session
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
