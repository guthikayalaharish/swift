const express = require("express");
const { client } = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api", userRoutes);

async function startServer() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

startServer();
