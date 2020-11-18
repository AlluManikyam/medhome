let db = require("../../dbconnection.js");
let mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
mongoose.connect(db.url);
let Schema = mongoose.Schema;
let pharmacySchema = new Schema({
  name: String,
  phone: String,
  email: String,
  registration_id:String,
  password: String,
  address: String,
  address_2: String,
  country: String,
  state: String,
  city: String,
  zipcode: String,
  picture: String,
  status: Number,
  deleted: Number,
  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date },
});

module.exports = mongoose.model("pharmacy", pharmacySchema);
