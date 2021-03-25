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
};
