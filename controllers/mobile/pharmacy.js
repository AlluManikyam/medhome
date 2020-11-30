let Pharmacy = require("../../models/mobile/pharmacy");
let CustomerOrder = require("../../models/mobile/customer-order");
//Create Pharmacy
exports.create_pharmacy = async (req, res) => {
  let new_pharmacy = new Pharmacy({
    name: req.body.message,
    register_id: req.body.registration_id,
    address: req.body.address,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    user_id: req.body.user_id,
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

// Get pharmacy list
exports.getPharmacyList = (req, res) => {
  Pharmacy.find({ user_id: req.params.user_id }, (err, pharmacy_list) => {
    if (err) {
      res.send({ error: true, status: "failed", msg: "failed" });
    } else {
      if (pharmacy_list.length) {
        pharmacy_list.forEach((pharmacy) => {
          CustomerOrder.find(
            {
              user_id: req.params.user_id,
              pharmacy_id: pharmacy.pharmacy_id,
              delivery_status: "Pending",
            },
            (err, orders) => {
              if (err) {
                res.send({ error: true, status: "failed", msg: "failed" });
              } else {
                pharmacy.deliveries=orders
              }
            }
          );
        });
      } else {
        res.send({
          error: false,
          data: pharmacy_list,
          status: "success",
          msg: "success",
        });
      }
    }
  });
};
