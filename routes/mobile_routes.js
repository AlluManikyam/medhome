module.exports = function (app) {
  let auth = require("../controllers/common/auth");
  let pharmacy = require("../controllers/mobile/pharmacy");
  
  // Pharmacy Routes
  app.post("/pharmacy/create_pharmacy", pharmacy.create_pharmacy);
  app.get(
    "/pharmacy/getPharmacyDetails/:id",
    auth.verifyToken,
    pharmacy.getPharmacyDetailsByUserId
  );

};

