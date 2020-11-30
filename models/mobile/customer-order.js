let db = require("../../db_connection.js");
let mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
mongoose.connect(db.url);
let Schema = mongoose.Schema;
let customerOrderSchema = new Schema({
  pharmacy_id:String,
  patient_name: String,
  phone: String,
  email: String,
  address: String,
  address_2: String,
  country: String,
  state: String,
  city: String,
  zip_code: String,
  amount: String,
  quarantine_status: Number,
  user_id: String,
  delivery_status: {type:String,default:'Pending'},
  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date },
});

module.exports = mongoose.model("customerorder", customerOrderSchema);
