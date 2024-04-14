const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { rootRouter } = require("./routes/index.js");
const MONGO_URL =
  "mongodb+srv://quang20204777:qwerty123@cluster0.o8ichat.mongodb.net/test";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", rootRouter);
mongoose
  .connect(MONGO_URL, {})
  .then(() => {
    console.log("Connect successfully!");
    app.listen(5000, () => {
      console.log("Server is running on port: 5000");
    });
  })
  .catch(() => {
    console.log("Connect failed!");
  });
