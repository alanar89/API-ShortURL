import "dotenv/config";
import express from "express";
import "./database/connect.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import linkRouter from "./routes/link.routes.js";
import bodyParse from "body-parser";

const app = express();
//pasear body
app.use(bodyParse.json());

app.use("/api/v1", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/links", linkRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`servidor iniciado en puerto ${PORT}`);
});
