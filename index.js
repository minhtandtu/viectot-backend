//-----------Library-----------------------------
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const getData = require("./controllers/allProject");

// ------------------------------------------------
app.use(cookieParser());
app.use(bodyParser.json());
require("dotenv").config();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

app.use(express.static("public"));
app.use("/images", express.static("images"));
app.use(express.static("uploads"));

const gate = process.env.GATE || "8080";

app.listen(gate, () => {
  console.log("Server is running on ", gate);
});

// -------------------DATABASE----------------------

const connectDB = require("./data/connect");
connectDB();
const route = require("./routes/index");
app.use("/api", route);

// const movieSchema = new mongoose.Schema({
//   name: String,
//   img: String,
//   year: Number,
//   rating: Number,
//   Genre: Array,
// });

// const movieModel = mongoose.model("movies", movieSchema);

// // ------------------Fetching Data--------------------
// const controller = async (req, res) => {
//   const limit = req.query.limit || 5;
//   const page = req.query.page || 1;
//   const skip = page * limit || 0;
//   const genre = req.query.genre.split(",") || [];
//   const sort = req.query.sort?.split(",") || { sorby: "rating", order: "asc" };
//   const sortby = {};
//   sortby[sort[0]] = sort[1];
//   const search = req.query.search || "";

//   const total = await movieModel
//     .countDocuments({ name: { $regex: search, $options: "i" } })
//     .where("genre")
//     .in([...genre]);
//   console.log("Total: ", total);

//   const movies = await movieModel
//     .find({
//       genre: { $in: [...genre] },
//       name: { $regex: search, $options: "i" },
//     })
//     .limit(limit)
//     .skip(skip)
//     .sort(sortby);
//   res.status(200).json(movies);
// };
// app.get("/movies", controller);
