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

module.exports = router;
