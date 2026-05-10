const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ======================
// REGISTER
// ======================
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // basic validation (prevents empty request crashes)
    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Name, email, and password are required"
      });
    }

    const userRole = role || "patient";

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: userRole,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });

  } catch (err) {
    console.log("🔥 ERROR MESSAGE:", err.message);

    // show Sequelize validation details clearly
    if (err.errors) {
      console.log("🔥 VALIDATION ERRORS:");
      err.errors.forEach((e) => {
        console.log("Field:", e.path);
        console.log("Issue:", e.message);
      });
    }

    return res.status(500).json({
      error: err.message,
      details: err.errors?.map(e => ({
        field: e.path,
        message: e.message
      }))
    });
  }
};

// ======================
// LOGIN
// ======================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required"
      });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.log("🔥 LOGIN ERROR:", err.message);

    return res.status(500).json({ error: err.message });
  }
};