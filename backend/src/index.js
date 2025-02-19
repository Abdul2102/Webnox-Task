const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connection = require("./config/connectdb");
const userRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const bodyParser = require("body-parser");
const app = express();

dotenv.config();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Needed for form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
connection();

app.use("uploads", express.static("src/uploads"));

app.use("/auth", userRoutes);
app.use("/posts",postRoutes);

app.use("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
