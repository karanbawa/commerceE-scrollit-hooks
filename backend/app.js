const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const productsRoutes = require("./routes/products");

const app = express();

mongoose
  .connect(process.env.MONGODB_URI ||
    "mongodb+srv://admin:admin@cluster0.ws3kr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true ,useUnifiedTopology: true }

  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

// app.use("/api/posts", postsRoutes);
app.use("/", userRoutes);
app.use("/products", productsRoutes);

module.exports = app;
