let mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
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
  device_token:String,
  device_type:String,
  vehicle_number:String,
  license_number:String,
  user_id: Number,
  status: Number,
  vehicle_number:String,
  license_number:String,
  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date },
});

module.exports = mongoose.model("users", usersSchema);
