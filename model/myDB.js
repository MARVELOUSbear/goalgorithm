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
  getArticles: async (start, itemPerPage) => {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db('goalgorithm');
      const articles = db.collection('article');
      const allArticles = await articles
        .find({})
        .skip(parseInt(start))
        .limit(parseInt(itemPerPage))
        .toArray();
      return allArticles;
    } finally {
      client.close();
    }
  },
  getArticlesCount: async () => {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db('goalgorithm');
      const articles = db.collection('article');
      const count = await articles.find({}).count();
      return count;
    } finally {
      client.close();
    }
  },
  getArticleById: async (articleID) => {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db('goalgorithm');
      const articles = db.collection('article');
      const articleFound = await articles.findOne({
        _id: ObjectId(articleID),
      });
      return articleFound;
    } finally {
      client.close();
    }
  },
  addArticle: async (article) => {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db('goalgorithm');
      const articles = db.collection('article');

      const x = await articles.insertOne({
        title: article.title,
        tags: article.tags,
        description: article.description,
        content: article.content,
        votes: 0,
        created_at: new Date(),
        updated_at: new Date(),
      });
      return x.insertedId;
    } finally {
      client.close();
    }
  },
};
