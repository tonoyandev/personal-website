---
layout: Post
title: Mastering Secure Password Flows with Node.js and MongoDB
description: If the thought of your user's password security gives you more chills than the ending of a thriller movie, then you've come to the right place! Sit back, grab your favorite fuel (caffeine is my bet), and let's together navigate the secure waters of password flows with Node.js and MongoDB.
date: '2023-04-17'
tags:
  - node-js
images:
  - src: /photos/blog-mastering-secure-password-with-node-js-and-mongoDB.png
    alt: mastering-secure-password-with-node-js-and-mongoDB
---

# Mastering Secure Password Flows with Node.js and MongoDB: When Security Becomes an Art!

Greetings, noble guardians of code!

If the thought of your user's password security gives you more chills than the ending of a thriller movie, then you've come to the right place! Sit back, grab your favorite fuel (caffeine is my bet), and let's together navigate the secure waters of password flows with Node.js and MongoDB.

<img src="https://media.giphy.com/media/QMHoU66sBXqqLqYvGO/giphy.gif" alt="Exciting journey ahead" width="500px" />

## Step 1: Picking Your Security Companion

In the vast universe of npm packages, choosing the right tool can feel like finding Waldo. Let me save you the hassle: `bcrypt` is your friend here!

```bash
npm install bcrypt
```

## Step 2: Crafting the Perfect Hashed Password

Storing the actual password is as bad as leaving your front door wide open while you're away on vacation. Instead, we store a hashed version of it. 

```javascript
const bcrypt = require('bcrypt');
const saltRounds = 10; 

bcrypt.hash('top_secret_password', saltRounds, function(err, hash) {
  if(err) {
    console.log(err);
  }
  // Now go store this `hash` in MongoDB, you great developer you!
});
```


## Step 3: Password Check with the Hash

Okay, now that we've got a safely hashed password, how do we check the entered password at login? `bcrypt` gives you a simple yet powerful method for this:

```javascript
bcrypt.compare('entered_password', hash, function(err, result) {
  if(err) {
    console.log(err);
  }
  if (result) {
    // Hurray, passwords match! Welcome in!
  } else {
    // Alas, passwords don't match. Not today, sir!
  }
});
```

## Step 4: MongoDB - The Trusty Sidekick

Now, what's a superhero without a sidekick? MongoDB, get in here! We need a place to store our hashed passwords, right? First, we need `mongoose`:

```bash
npm install mongoose
```

And then let's create a User schema:

```javascript
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('User', UserSchema);
```


## Step 5: Tying Up The Package 

Now for the grand finale, let's wrap it all together:

```javascript
const express = require('express');
const app = express();
app.use(express.json());

// User registration
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if(!username || !password) {
      return res.status(400).send("Invalid Input");
    }
    const userExists = await User.findOne({ username });
    if(userExists) {
      return res.status(400).send("User Already Exists");
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({ username, password: hashedPassword });


    await user.save();
    res.sendStatus(201);
  } catch(err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// User login
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if(!username || !password) {
      return res.status(400).send("Invalid Input");
    }
    const user = await User.findOne({ username });
    if(!user) {
      return res.status(400).send("User does not exist");
    }
    const valid = await bcrypt.compare(password, user.password);

    if (valid) {
      res.sendStatus(200);
    } else {
      res.sendStatus(403);
    }
  } catch(err) {
    console.log(err);
    res.sendStatus(500);
  }
});
```

## Closing Thoughts

Remember, folks, when it comes to securing your user's passwords, it's not just about the destination, it's about the journey (and the salt rounds, and the hashed passwords). Let's ensure the safety of our users' data because nothing spoils a user's day more than a data breach!

<img src="https://media.giphy.com/media/XreQmk7ETCak0/giphy.gif" alt="Security is important" width="500px" />

Happy coding!