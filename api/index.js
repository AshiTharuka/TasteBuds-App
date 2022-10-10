import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import cartRoute from "./routes/cart.js"
import usersRoute from "./routes/users.js";
import restaurantsRoute from "./routes/restaurant.js";
import foodsRoute from "./routes/food.js";
import cookieParser from "cookie-parser";
import orderRoute from "./routes/orders.js";
import stripeRoute from "./routes/stripe.js";

import cors from "cors";



const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json());


app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/restaurants", restaurantsRoute);
app.use("/api/foods", foodsRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);



app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  connect();
  console.log("Connected to backend.");
});
