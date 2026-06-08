const express = require("express");
const connectDB = require("./db");

connectDB();

const app = express();
app.use("/api/auth", authRoutes);