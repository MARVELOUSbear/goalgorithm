const { MongoClient, ObjectId } = require('mongodb');

// eslint-disable-next-line no-undef
const url = process.env.MONGO_URL || 'mongodb://localhost:27017/';

module.exports = {
  addUser: async (user) => {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db('goalgorithm');
      const users = db.collection('user');

      const x = await users.insertOne({
        username: user.username,
        email: user.email,
        password: user.password,
      });
      return x.insertedId;
    } finally {
      client.close();
    }
  },

  getUser: async (email) => {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db('goalgorithm');
      const users = db.collection('user');
      const userFound = await users.findOne({
        email: email,
      });
      return userFound;
    } finally {
      client.close();
    }
  },
  getUserById: async (user_id) => {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db('goalgorithm');
      const users = db.collection('user');
      const userFound = await users.findOne({
        _id: ObjectId(user_id),
      });
      return userFound;
    } finally {
      client.close();
    }
  },
};
