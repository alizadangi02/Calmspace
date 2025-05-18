// backend/controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      role = "user",
      specialties = [],
      degree,
      institution,
      notificationPrefs,
      emergencyContact,
      adminCode,
    } = req.body;

    // Validate role
    if (!["user", "therapist", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role specified" });
    }

    // Admin code check
    if (role === "admin" && adminCode !== process.env.ADMIN_REG_CODE) {
      return res
        .status(403)
        .json({ message: "Invalid admin registration code" });
    }

    // Prevent duplicate emails
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    // Build new user object
    const newUser = {
      name,
      email,
      password: hashed,
      role,
      status: role === "therapist" ? "pending" : "approved",
    };

    // Attach role-specific fields
    if (role === "user") {
      if (notificationPrefs) newUser.notificationPrefs = notificationPrefs;
      if (emergencyContact) newUser.emergencyContact = emergencyContact;
    }

    if (role === "therapist") {
      newUser.specialties = specialties;
      newUser.degree = degree;
      newUser.institution = institution;
      // status defaults to 'pending'
    }

    // Save
    const user = await new User(newUser).save();

    // Issue JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Response payload
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        specialties: user.specialties || [],
        degree: user.degree,
        institution: user.institution,
        notificationPrefs: user.notificationPrefs || {},
        emergencyContact: user.emergencyContact || {},
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        specialties: user.specialties || [],
        degree: user.degree,
        institution: user.institution,
        notificationPrefs: user.notificationPrefs || {},
        emergencyContact: user.emergencyContact || {},
      },
    });
  } catch (err) {
    next(err);
  }
};
