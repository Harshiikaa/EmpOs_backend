const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./database/db");
const { log } = require("./utils/logger");
const app = express();

app.use(express.json());

dotenv.config();

const corsPolicy = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsPolicy));
connectDB();

app.get("/", (req, res) => {
  res.send("Express backend is running!");
});

app.use((err, req, res, next) => {
  log(`Error: ${err.message}`);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    errors: [err.message],
  });
});

app.listen(process.env.PORT, () => {
  log(`Backend server running on http://localhost:${process.env.PORT}`);
});
