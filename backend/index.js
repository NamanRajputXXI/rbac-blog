require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const app = express();

app.use(express.json());
connectDB();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("backend is running");
});
// app.use("/api/auth", routes);
// app.use("/api/", routes);

app.listen(PORT, () => {
  console.log(`server is runnung at port ${PORT}`);
});
