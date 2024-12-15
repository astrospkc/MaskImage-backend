import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const router = express.Router();

// signup->
// get the user credentials - name email password from body
// check user exist or not - if not create a new user
// generate jwt token
// return the user details
const signUp = async (req, res) => {
  try {
    let success = false;
    const { name, email, password } = req.body;

    // checking if all the credentials are provided
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please enter all the details" });
    }

    // checking if user exist or not
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({ error: "User already exist" });
    }

    // hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    // creatng a new user
    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    const data = {
      user: {
        id: user.id,
      },
    };
    // with auth token the user data is also passed with user id
    const authtoken = jwt.sign(data, process.env.JWT_SECRET);
    success = true;
    res.json({ success, authtoken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal error occured");
  }
};

// login user
// get the user credentials - name password
// compare the password bcrypt
// generate jwt token
// return the user details
const loginUser = async (req, res) => {
  try {
    let success = false;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Please enter all the details" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, process.env.JWT_SECRET);
    success = true;
    res.json({ success, authtoken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal error occured");
  }
};

router.post("/signup", signUp);
router.post("login", loginUser);

export default router;
