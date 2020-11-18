let User = require("../../models/common/users");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const privateKey = config.secret;
module.exports.verifyToken = async (req, res, next) => {
  //JWT Token Implementation

  let token = req.headers.authorization;
  if (token && token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length).trimLeft();
  }
  if (token) {
    jwt.verify(token, privateKey, async (err, decoded) => {
      if (err) {
        res.send({
          error: true,
          status: "failed",
          token:"expired",
          msg: "Failed to authenticate token. Token expired.",
        });
      } else {
        try {
          const user = await User.findOne({ _id: decoded.id });

          if (user._id == decoded.id) {
            next();
          } else {
            res.send({
              error: true,
              status: "failed",
              msg: "Failed to authenticate token.",
            });
          }
        } catch (e) {
          res.send({
            error: true,
            status: "failed",
            msg: "Failed to authenticate. Please try again",
          });
        }
      }
    });
  } else {
    res.send({ error: true, status: "failed", msg: "No token provided." });
  }
};
