let auth = require("../controllers/common/auth.js");
let pharmacy = require("../controllers/mobile/pharmacy");
let user = require("../controllers/common/users");

module.exports = function (app) {
  // User Routes 
  app.post("/user/register", user.create_user);
  app.post("/user/login", user.login);
  app.post("/user/setPassword", user.setPassword);
  app.post("/user/changePassword/:id", auth.verifyToken, user.changePassword);
  app.post("/user/updateProfile/:id", auth.verifyToken, user.updateProfile);
  app.get(
    "/getPharmacyList",
    auth.verifyToken,
    pharmacy.getPharmacyList
  );
};
