const express = require("express");
const session = require("express-session");
const bcrypt = require("bcryptjs");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "shhhh, very secret",
  })
);

const users = [];

// Homepage
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// User login
app.post("/api/login", (req, res) => {
  try {
    const { username, password } = req.body;

    const user = users.find((user) => user.username === username);
    if (!user) {
      return res.status(400).send("User not found.");
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const userCopy = { ...user };
        delete userCopy.password;
        res.status(200).send(userCopy);
      } else {
        res.status(400).send("Invalid password.");
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// User registration
app.post("/api/register", (req, res) => {
  try {
    const { username, password } = req.body;

    const user = users.find((user) => user.username === username);
    if (user) {
      return res.status(400).send("Username already exists.");
    }

    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Internal server error");
      }

      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Internal server error");
        }

        const newUser = {
          username,
          password: hash,
        };

        users.push(newUser);

        const userCopy = { ...newUser };
        delete userCopy.password;
        res.status(200).send(userCopy);
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// Server start
app.listen(4004, () => console.log("Server running on port 4004"));
