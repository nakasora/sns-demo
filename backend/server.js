const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "http://localhost:5173";
app.use(
  cors({
    origin: ALLOWED_ORIGIN, //アクセス許可するオリジン
    credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
    optionsSuccessStatus: 200, //レスポンスstatusを200に設定
  })
);
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const uploadRoute = require("./routes/upload");
const PORT = 3000;

app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.json());
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("DB接続中");
  })
  .catch((e) => {
    console.log(e);
  });

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/upload", uploadRoute);
app.listen(PORT, () => console.log("Server Start"));
