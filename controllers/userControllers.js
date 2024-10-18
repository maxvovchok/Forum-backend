const uuid = require("uuid").v4;
const fs = require("fs").promises;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../model/userModel");
const { generateKey } = require("crypto");
const { secret } = require("../config");
const Role = require("../model/roleModel");
const { userRolesEnum } = require("../constants");

const generateAccessToken = (id, role) => {
  const payload = {
    id,
    role,
  };
  return jwt.sign(payload, secret, { expiresIn: "72h" });
};

exports.registration = async (req, res) => {
  try {
    const errValidator = validationResult(req);

    if (!errValidator.isEmpty()) {
      return res
        .status(400)
        .json({ message: "registration error1", errValidator });
    }
    const { password, ...restUserData } = req.body;
    const candidate = await User.findOne({ email: restUserData.email });
    if (candidate) {
      return res
        .status(409)
        .json({ message: "user with that name already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userRole = await Role.findOne({ value: "user" });

    const user = new User({
      ...restUserData,
      password: hashedPassword,
      role: userRole.value,
    });

    await user.save();

    return res.status(201).json({
      msg: "Success",
      user: user,
    });
  } catch (error) {
    res.status(400).json({ message: "registration error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "no user found" });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ massage: "the entered password is not correct" });
    }

    const token = generateAccessToken(user._id, user.role);
    return res.json({ token });
  } catch (error) {
    res.status(400).json({ message: "login error" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.getUser = async (req, res) => {
  try {
    const users = JSON.parse(await fs.readFile("module.js"));
    const { id } = req.params;

    const findUser = users.find((user) => user.id === id);

    res.status(200).json({
      msg: "Success",
      findUser,
    });
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.patchUser = async (req, res) => {
  try {
    const userData = req.body;
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    Object.keys(userData).forEach((key) => {
      user[key] = userData[key];
    });

    await user.save();

    return res.status(200).json({
      msg: "Success",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(id);

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting user" });
  }
};
