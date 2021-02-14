let mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
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
  zip_code: String,
  picture: String,
  status: Number,
  user_id: String,
  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date },
});

module.exports = mongoose.model("pharmacy", pharmacySchema);
