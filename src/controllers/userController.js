const { collections } = require("../config/db");
const { fetchUsers } = require("../services/fetchData");

async function loadUsers(req, res) {
  try {
    const users = await fetchUsers();
    await collections.users.insertMany(users);
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ message: "Error loading users", error });
  }
}

async function deleteUsers(req, res) {
  try {
    await collections.users.deleteMany({});
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting users", error });
  }
}

async function deleteUser(req, res) {
  const userId = parseInt(req.params.userId);
  try {
    const result = await collections.users.deleteOne({ id: userId });
    if (result.deletedCount === 0) return res.status(404).json({ message: "User not found" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
}

async function getUser(req, res) {
  const userId = parseInt(req.params.userId);
  try {
    const user = await collections.users.findOne({ id: userId });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
}

async function addUser(req, res) {
  const newUser = req.body;
  try {
    const existingUser = await collections.users.findOne({ id: newUser.id });
    if (existingUser) return res.status(409).json({ message: "User already exists" });

    await collections.users.insertOne(newUser);
    res.status(201).json({ message: "User created", location: `/users/${newUser.id}` });
  } catch (error) {
    res.status(500).json({ message: "Error adding user", error });
  }
}

module.exports = { loadUsers, deleteUsers, deleteUser, getUser, addUser };
