import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User doesnt exists" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export const signup = async (req, res) => {
  const { firstName, lastName, confirmpassword, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ massage: "User already exists" });
    }
    if (password !== confirmpassword) {
      return res.status(400).json({ massage: "Passwords do not match" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });
    const token = jwt.sign({ id: newUser._id, email: newUser.email },process.env.JWT_SECRET,{ expiresIn: "1h" });
    const savedUser = await newUser.save();
    res.status(200).json(token,savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
