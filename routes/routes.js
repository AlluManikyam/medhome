let auth = require("../controllers/common/auth.js");
let pharmacy = require("../controllers/mobile/pharmacy");
let user = require("../controllers/common/users");
let customerorder = require("../controllers/mobile/customer-order");

module.exports = function (app) {
  // User Routes 
  app.post("/user/register", user.create_user);
  app.post("/user/login", user.login);
  app.post("/user/setpassword", user.setPassword);
  app.post("/user/changepassword/:id", auth.verifyToken, user.changePassword);
  app.post("/user/updateprofile/:id", auth.verifyToken, user.updateProfile);
  app.get(
    "/pharmacylist",
    auth.verifyToken,
    pharmacy.getPharmacyList
  );
  app.post(
    "/customer-order",
    auth.verifyToken,
    customerorder.create_customer_order
  );
};
