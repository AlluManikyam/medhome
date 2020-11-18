let Pharmacy = require("../../models/mobile/pharmacy");

//Create Pharmacy
exports.create_pharmacy = async (req, res) => {
  let new_pharmacy = new Pharmacy({
    name: req.body.message,
    register_id:req.body.registration_id,
    address:req.body.address,
    phone: req.body.phone,
    email:  req.body.email,
  });
  new_pharmacy.save(function (err) {
    if (err) {
      res.send({ error: true, status: "failed", msg: "failed" });
    } else {
      res.send({
        error: false,
        status: "success",
        msg: "Pharmacy has been created successfully",
      });
    }
  });
};


// Get pharmacy details by user id
exports.getPharmacyDetailsByUserId = (req, res) => {
    Pharmacy.findById({ deleted: { $ne: 1 }, _id: req.params.id }, (err, user) => {
    if (err) {
      res.send({ error: true, status: "failed", msg: "failed" });
    } else {
      res.send({
        error: false,
        data: user,
        status: "success",
        msg: "success",
      });
    }
  });
};
