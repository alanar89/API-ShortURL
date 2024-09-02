import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;
  //verificar envio token
  if (!token) {
    return res.status(401).json({ error: "token not provided" });
  }
  token = token.split(" ")[1];
  //validar token
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "invalid token" });
  }
};
