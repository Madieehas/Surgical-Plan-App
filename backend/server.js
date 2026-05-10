const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/db");

// MODELS
const User = require("./models/User");
const SurgicalPlan = require("./models/SurgicalPlan");

// ROUTES
const authRoutes = require("./routes/authRoutes");
const surgicalPlanRoutes = require("./routes/surgicalPlanRoutes");

// MIDDLEWARE
const auth = require("./middleware/auth");
const role = require("./middleware/roleMiddleware");

const app = express();

// ======================
// MIDDLEWARE
// ======================
app.use(cors());
app.use(express.json());

// ======================
// TEST ROUTE
// ======================
app.get("/", (req, res) => {
  res.send("Surgical Plan App API is running 🚀");
});

// ======================
// ROUTES
// ======================
app.use("/api/auth", authRoutes);
app.use("/api/plans", surgicalPlanRoutes);

// ======================
// ROLE TEST ROUTES
// ======================
app.get("/test-doctor", auth, role(["doctor"]), (req, res) => {
  res.json({ message: "Doctor access granted" });
});

app.get("/test-patient", auth, role(["patient"]), (req, res) => {
  res.json({ message: "Patient access granted" });
});

// ======================
// START SERVER (FIXED FOR RENDER)
// ======================
const PORT = process.env.PORT || 5000;

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database Synced");

    return sequelize.authenticate();
  })
  .then(() => {
    console.log("DB Connected Successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("DB Error:", err);
  });