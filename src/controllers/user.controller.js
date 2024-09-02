import { User } from "../models/user.model.js";

export const profile = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.uid });
    return res.status(200).json({ user: user.email });
  } catch (error) {
    return res.json({ error: error });
  }
};
