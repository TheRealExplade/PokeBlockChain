console.log("SERVER FILE LOADED");

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION:", err);
});

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Server working 🚀");
});

app.get("/test", (req, res) => {
  res.send("Test route working");
});

const cardRoutes = require("./routes/cardRoutes");
app.use("/api/cards", cardRoutes);

const gameRoutes = require("./routes/gameRoutes");
app.use("/api/game", gameRoutes);




const PORT = 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// keep process alive
process.stdin.resume();