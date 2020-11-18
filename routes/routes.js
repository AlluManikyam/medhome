let auth = require("../controllers/common/auth.js");
module.exports = function (app) {
  let bodyParser = require("body-parser");
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ extended: true }));

  let user = require("../controllers/common/users");

  // User Routes 
  app.post("/user/register", user.create_user);
  app.post("/user/login", user.login);
  app.post("/user/setPassword", user.setPassword);
  app.post("/user/changePassword/:id", auth.verifyToken, user.changePassword);
  app.post("/user/updateProfile/:id", auth.verifyToken, user.updateProfile);
  app.get(
    "/user/getUserDetails/:id",
    auth.verifyToken,
    user.getUserDetailsByUserId
  );
};
