require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const logger = require("morgan");
const fileUpload = require("express-fileupload");
require("./config/database.config").connect();


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.get("/", async (req, res) => {
  return res.json("hello");
});

const studentRoute = require("./routes/students.route");

app.use("/api/students", studentRoute);

app.listen(port, () =>
  console.log(`>>> Server is up and running on port : ${port}`)
);
