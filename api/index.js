import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRoute from "./routers/auth.js";
import userRoute from "./routers/user.js";
import postRoute from "./routers/post.js";
import catRoute from "./routers/category.js";

dotenv.config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

// Middlewares
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000", 
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", catRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).send(errorMessage);
});


app.listen(process.env.PORT||8000,()=>{
  console.log("server run on port 8000")
})

