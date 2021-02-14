let express = require("express");
let cors = require("cors");
let app = express();
let bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "150mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
let dbUrl = require("./db_connection");
let mongoose = require("mongoose");

mongoose
  .connect(dbUrl.url, dbUrl.options)
  .then(() => {
    console.log("DB: Connect OK!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(function (req, res, next) {
  //allow cross origin requests
  cors();
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

//welcome page
app.get("/", function (req, res) {
  console.log("Welcome to Med Home");
  res.json({ message: "Welcome to  Med Home" });
});
require("./routes/routes.js")(app);
require("./routes/mobile_routes.js")(app);
app.listen(2020);
