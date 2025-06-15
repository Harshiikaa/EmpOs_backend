const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./database/db");
const { log } = require("./utils/logger");
const departmentRoutes = require("./routes/departmentRoute");
const organizationRoutes = require("./routes/organizationRoute");
const employeeRoutes = require("./routes/employeeRoutes");

// Load environment variables from .env file
dotenv.config();
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());
const port = 3001;

// Set up CORS policy to allow cross-origin requests
const corsPolicy = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsPolicy));
// Connect to MongoDB database
connectDB();

// Route handlers for different modules
app.use("/api/admin/department", departmentRoutes);
app.use("/api/admin/organizations", organizationRoutes);
app.use("/api/admin/employee", employeeRoutes);

// Basic test route to confirm server is running
app.get("/", (req, res) => {
  res.send("Express backend is running!");
});

// Global error handling middleware
app.use((err, req, res, next) => {
  log(`Error: ${err.message}`);
  res.status(500).json({
    success: false,
    message: "Please contact to your Service",
    errors: [err.message],
  });
});

// Start the Express server
app.listen(port, () => {
  log(`Backend server running on http://localhost:${port}`);
});
