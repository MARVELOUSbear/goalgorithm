const express = require('express');
const router = express.Router();

router.get('/testConnection', (req, res) => {
  res.send({ msg: 'it is working now' });
});

module.exports = router;
