const { MongoClient } = require("mongodb");

const MONGO_URI = "mongodb://localhost:27017"; // Change if needed
const DB_NAME = "node_assignment";

const client = new MongoClient(MONGO_URI);
const db = client.db(DB_NAME);

const collections = {
  users: db.collection("users"),
  posts: db.collection("posts"),
  comments: db.collection("comments"),
};

module.exports = { client, collections };
