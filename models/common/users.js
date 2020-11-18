let db = require("../../dbconnection.js");
let mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
mongoose.connect(db.url);
let Schema = mongoose.Schema;
let usersSchema = new Schema({
  full_name: String,
  phone: String,
  email: String,
  password: String,
  address: String,
  address_2: String,
  country: String,
  state: String,
  city: String,
  zipcode: String,
  profile_image: String,
  user_type: String,
  deviceToken:String,
  deviceType:String,
  vehicleNumber:String,
  licenseNumber:String,
  status: Number,
  deleted: Number,
  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date },
});

module.exports = mongoose.model("users", usersSchema);
