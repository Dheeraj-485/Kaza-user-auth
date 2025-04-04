// const pool = require("../config/db");
// const bcrypt = require("bcrypt");

// // Signup Controller
// exports.signup = async (req, res) => {
//   const { username, email, password } = req.body;

//   if (!username || !email || !password) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   try {
//     // Check if username or email already exists
//     const userCheck = await pool.query(
//       "SELECT * FROM users WHERE username = $1 OR email = $2",
//       [username, email]
//     );

//     if (userCheck.rows.length > 0) {
//       return res
//         .status(400)
//         .json({ message: "Username or Email already exists" });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Insert user into DB
//     await pool.query(
//       "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
//       [username, email, hashedPassword]
//     );

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// // Login Controller
// exports.login = async (req, res) => {
//   const { usernameOrEmail, password } = req.body;

//   if (!usernameOrEmail || !password) {
//     return res
//       .status(400)
//       .json({ message: "Missing username/email or password" });
//   }

//   try {
//     // Try finding user by username or email
//     const userQuery = await pool.query(
//       "SELECT * FROM users WHERE username = $1 OR email = $1",
//       [usernameOrEmail]
//     );

//     const user = userQuery.rows[0];

//     if (!user) return res.status(401).json({ message: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(401).json({ message: "Invalid credentials" });

//     // Return success
//     res.status(200).json({
//       message: "Login successful",
//       user: { id: user.id, username: user.username, email: user.email },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  signupSchema,
  loginSchema,
  profileSchema,
} = require("../validations/userValidation");

exports.signup = async (req, res) => {
  try {
    const { error } = signupSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE username = $1 OR email = $2",
      [username, email]
    );
    if (existingUser.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "Username or email already exists." });
    }

    await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { usernameOrEmail, password } = req.body;

    const userQuery = await pool.query(
      "SELECT * FROM users WHERE username = $1 OR email = $1",
      [usernameOrEmail]
    );

    const user = userQuery.rows[0];
    if (!user) return res.status(400).json({ message: "Invalid credentials." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials." });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful.", token });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};

// exports.updateProfile = async (req, res) => {
//   try {
//     const { error } = profileSchema.validate(req.body);
//     if (error)
//       return res.status(400).json({ message: error.details[0].message });

//     const { name, bio } = req.body;
//     const userId = req.user.id;
//     console.log("userId", userId);

//     await pool.query("UPDATE users SET name = $1, bio = $2 WHERE id = $3", [
//       name,
//       bio,
//       userId,
//     ]);

//     res.status(200).json({ message: "Profile updated successfully." });
//   } catch (err) {
//     res.status(500).json({ message: "Server error.", error: err.message });
//   }
// };

exports.updateProfile = async (req, res) => {
  const userId = req.userId;
  const { email, password } = req.body;

  try {
    const updates = [];
    const values = [];

    if (email) {
      updates.push("email = $" + (values.length + 1));
      values.push(email);
    }

    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      updates.push("password = $" + (values.length + 1));
      values.push(hashed);
    }

    if (!updates.length)
      return res.status(400).json({ message: "No valid fields to update." });

    values.push(userId);
    const query = `UPDATE users SET ${updates.join(", ")} WHERE id = $${
      values.length
    }`;

    await pool.query(query, values);
    res.status(200).json({ message: "Profile updated successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};
