const express = require("express");
const uuid = require("uuid").v4;
const cors = require("cors");
const fs = require("fs").promises;
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({
  path:
    process.env.NODE_ENV === "prudction"
      ? "./environments/production.env"
      : "./environments/development.env",
});

const userRouter = require("./router/userRouter");

const app = express();

if (process.env.NODE_ENV === "developmen") app.use(morgan("dev"));

mongoose
  .connect(process.env.MONGO_URL)
  .then((con) => console.log("mongodb connected"))
  .catch((err) => console.log("err", err));

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);

const port = 3000;

app.listen(port, () => {
  console.log(`server run: ${port}`);
});
