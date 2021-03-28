const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const goalgorithmDB = require('../model/myDB');

router.get('/testConnection', (req, res) => {
  res.send({ msg: 'it is working now' });
});

router.post('/register', async (req, res) => {
  const user = req.body;
  console.log(user);
  const hash = await bcrypt.hash(user.password, 10);
  const new_user = {
    ...user,
    password: hash,
  };
  try {
    const userId = await goalgorithmDB.addUser(new_user);
    console.log(userId);
    res.send({ status: true, user_id: userId });
  } catch {
    res.send({
      status: false,
    });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await goalgorithmDB.getUser(email);
    if (!user) {
      res.send({
        status: false,
      });
      return;
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      res.send({ status: 'verified', user_id: user._id });
    } else {
      res.send({
        status: 'notMatch',
      });
    }
  } catch {
    res.send({
      status: false,
    });
  }
});

router.get('/currentUser', async (req, res) => {
  console.log('id is ', req.query);
  const { id } = req.query;
  try {
    const user = await goalgorithmDB.getUserById(id);
    res.json(user);
  } catch (err) {
    res.send(err);
  }
});

router.get('/allArticles', async (req, res) => {
  try {
    const articles = await goalgorithmDB.getAllArticles();
    console.log(articles);
    res.json(articles);
  } catch (err) {
    res.send(err);
  }
});
// router.get('/articles:id', async (req, res) => {
//   console.log(req.body);

// });

module.exports = router;
