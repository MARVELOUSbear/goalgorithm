const express = require('express');
const path = require('path');
const cors = require('cors');

const indexRouter = require('./routes/index');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, './client/build')));

app.use('/', indexRouter);

app.listen(process.env.PORT || 3001, () => {
  console.log('Server Started!');
});

module.exports = app;
