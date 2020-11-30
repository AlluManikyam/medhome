let CustomerOrder = require("../../models/mobile/customer-order");

//Create Pharmacy
exports.create_customer_order = async (req, res) => {
  let new_customer_order = new CustomerOrder({
    pharmacyId: req.body.pharmacy_id,
    patient_name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
    address_2: req.body.address_2,
    country: req.body.country,
    state: req.body.state,
    city: req.body.city,
    zip_code: req.body.zip_code,
    amount: req.body.amount,
    quarantine_status: req.body.quarantine_status,
    user_id: req.body.user_id,
  });
  new_customer_order.save(function (err) {
    if (err) {
      res.send({ error: true, status: "failed", msg: "failed" });
    } else {
      res.send({
        error: false,
        status: "success",
        msg: "Customer order has been created successfully",
      });
    }
  });
};

// Get pharmacy order list
exports.getPharmacyOrdersList = (req, res) => {
  CustomerOrder.find({ user_id: req.params.user_id,pharmacy_id:req.params.pharmacy_id }, (err, orders) => {
    if (err) {
      res.send({ error: true, status: "failed", msg: "failed" });
    } else {
      res.send({
        error: false,
        data: orders,
        status: "success",
        msg: "success",
      });
    }
  });
};

// Get all orders list
exports.getCustomerOrderList = (req, res) => {
  Pharmacy.find({ user_id: req.params.user_id }, (err, orders) => {
    if (err) {
      res.send({ error: true, status: "failed", msg: "failed" });
    } else {
      res.send({
        error: false,
        data: orders,
        status: "success",
        msg: "success",
      });
    }
  });
};



// Take Ownership
exports.take_ownership = async (req, res) => {
  
};

