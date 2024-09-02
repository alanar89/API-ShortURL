import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";

export const register = async (req, res) => {
  const { email, password } = req.body;
  //encriptacion de password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  //creacion nuevo modelo de user
  const user = new User({ email, password: hashedPassword });
  try {
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  // return res.status(200).json({ ok: true });
  //validacion de campos

  //verficacion de usuario
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: "user not found" });
  }
  //verificacion de password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: "invalid credentials" });
  }
  //generacion de token
  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return res.status(200).json({ ok: true, msg: token });
};
