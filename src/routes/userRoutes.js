const express = require("express");
const { loadUsers, deleteUsers, deleteUser, getUser, addUser } = require("../controllers/userController");

const router = express.Router();

router.get("/load", loadUsers);
router.delete("/users", deleteUsers);
router.delete("/users/:userId", deleteUser);
router.get("/users/:userId", getUser);
router.put("/users", addUser);

module.exports = router;
