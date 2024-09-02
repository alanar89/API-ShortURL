import mongoose from "mongoose";

//conectar bd mongoose
try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("conectado a la bd");
} catch (error) {
  console.log("error al conectar la base de datos" + error);
}
