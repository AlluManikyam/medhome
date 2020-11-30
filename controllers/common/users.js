let User = require("../../models/common/users");
const jwt = require("jsonwebtoken");
var aws = require("aws-sdk");
const config = require("../.././config");
let _ = require("lodash");
let isBase64 = require("is-base64");

aws.config.update({
  accessKeyId: config.credentials.accessKeyId,
  secretAccessKey: config.credentials.secretAccessKey,
  region: config.credentials.region,
});

const s3 = new aws.S3();

//Create user
exports.create_user = async (req, res) => {
  let new_user = new User(req.body);
  new_user.save(function (err) {
    if (err) {
      res.send({ error: true, status: "failed", msg: "failed" });
    } else {
      res.send({
        error: false,
        status: "success",
        msg: "The user has been created successfully",
      });
    }
  });
};

exports.login = (req, res) => {
  if (
    req.body.phone &&
    req.body.phone != "" &&
    req.body.password &&
    req.body.password != ""
  ) {
    const phone = req.body.phone;
    const password = req.body.password;
console.log("request",req.body);
    User.find(
      { phone: phone, password: password},
      async (err, users) => {
        console.log("request",users);

        if (err) {
          res.send({
            error: true,
            status: "failed",
            msg: "Failed user login",
          });
        } else {
          if (users.length != 0) {
            await User.updateOne(
              {
                phone: req.body.phone,
              },
              {
                $set: {
                  deviceToken: req.body.deviceToken,
                  deviceType: req.body.deviceType,
                },
              }
            );
            const payload = {
              id: users[0]._id,
            };
            jwt.sign(
              payload,
              config.secret,
              { expiresIn: 3600 * 48 },
              async (err, token) => {
                if (err) {
                  res.send({
                    error: true,
                    status: "failed",
                    msg: "There is some error in token",
                  });
                } else {
                  res.send({
                    error: false,
                    status: "success",
                    token: `Bearer ${token}`,
                    msg: "login success",
                    data: users[0],
                  });
                }
              }
            );
          } else {
            res.send({
              error: false,
              status: "failed",
              msg: "Invalid phone number or password. Please try again",
            });
          }
        }
      }
    );
  } else if (req.body.phone && req.body.phone != "") {
    const phone = req.body.phone;
    userLogin(phone, res);
  } else {
    res.send({
      error: false,
      status: "failed",
      msg: "Please provide phone number and password.",
    });
  }
};

// User Login
function userLogin(phone, res) {
  User.find({ phone: phone, deleted: { $ne: 1 } }, async (err, users) => {
    if (err) {
      res.send({
        error: false,
        status: "failed",
        msg: "Login failed, Please try again",
      });
    } else {
      if (users.length != 0) {
        res.send({
          error: true,
          status: "failed",
          msg: "Please enter valid password",
        });
      } else {
        res.send({
          error: true,
          status: "failed",
          msg: "Please enter valid phone number",
        });
      }
    }
  });
}

// Set Password
exports.setPassword = (req, res) => {
  if (
    req.body.phone &&
    req.body.phone != "" &&
    req.body.password &&
    req.body.password != ""
  ) {
    const phone = req.body.phone;
    const password = req.body.password;

    User.find({ phone: phone, deleted: false }, async (err, users) => {
      if (err) {
        res.send({
          error: true,
          status: "failed",
          msg: "Invalid Phone Number",
        });
      } else {
        if (users.length != 0) {
          const pwd = require("crypto")
            .createHash("md5")
            .update(password)
            .digest("hex");
          let updated_date = new Date();
          await User.updateOne(
            { email: email },
            {
              $set: {
                password: pwd,
                deviceToken: req.body.deviceToken,
                deviceType: req.body.deviceType,
                updated_date,
                status: 1,
              },
            }
          );
          User.find(
            { email: email, password: pwd, deleted: false },
            (err, users) => {
              if (users.length > 0) {
                const payload = {
                  id: users[0]._id,
                };
                jwt.sign(
                  payload,
                  config.secret,
                  { expiresIn: 3600 * 48 },
                  async (err, token) => {
                    if (err) {
                      res.send({
                        error: true,
                        status: "failed",
                        msg: "There is some error in token",
                      });
                    } else {
                      res.send({
                        error: false,
                        status: "success",
                        token: `Bearer ${token}`,
                        msg: "Your password has been created successfully",
                        data: users[0],
                      });
                    }
                  }
                );
              }
            }
          );
        }
      }
    });
  } else {
    res.send({ error: true, status: "failed", msg: "Please provide a email" });
  }
};

// Change Password
exports.changePassword = (req, res) => {
  if (
    req.body.oldPassword &&
    req.body.oldPassword != "" &&
    req.body.newPassword &&
    req.body.newPassword != ""
  ) {
    const oldPwd = require("crypto")
      .createHash("md5")
      .update(req.body.oldPassword)
      .digest("hex");
    const newPwd = require("crypto")
      .createHash("md5")
      .update(req.body.newPassword)
      .digest("hex");
    const userId = req.params.id;
    User.find({ _id: userId, deleted: false }, async (err, users) => {
      if (err) {
        res.send({ error: true, status: "failed", msg: "Invalid Email" });
      } else {
        if (users.length != 0) {
          let user = users[0];
          if (user.password === oldPwd) {
            let updated_date = new Date();
            await User.updateOne(
              { _id: userId },
              { $set: { password: newPwd, updated_date } }
            );
            res.send({
              error: false,
              status: "success",
              msg: "Password has been changed successfully",
            });
          } else {
            res.send({
              error: true,
              status: "failed",
              msg: "Please provide a valid password",
            });
          }
        }
      }
    });
  } else {
    res.send({
      error: true,
      status: "failed",
      msg: "Please provide a valid password",
    });
  }
};

// Forgot Password
exports.forgotPassword = (req, res) => {
  if (req.body.email && req.body.email != "") {
    const email = req.body.email;
    User.find({ email: email, deleted: false }, async (err, users) => {
      if (err) {
        res.send({ error: true, status: "failed", msg: "Invalid Email" });
      } else {
        if (users.length != 0) {
          let user = users[0];
          let otp = generateOTP();
          let updated_date = new Date();

          await User.updateOne(
            { email: email },
            { $set: { otp: otp }, updated_date }
          );
          res.send({
            error: false,
            status: "success",
            msg: "OTP has been sent successfully to your mail",
          });
        } else {
          res.send({
            error: true,
            status: "failed",
            msg: "Please use your company email address or contact your admin",
          });
        }
      }
    });
  } else {
    res.send({ error: true, status: "failed", msg: "Please provide a email" });
  }
};

// Update Profile
exports.updateProfile = (req, res) => {
  const userId = req.params.id;
  User.find({ _id: userId, deleted: false }, async (err, users) => {
    if (err) {
      res.send({ error: true, status: "failed", msg: "Invalid Email" });
    } else {
      if (users.length != 0) {
        if (req.body.profile_image && req.body.profile_image != "") {
          let user = users[0];
          var name = `${user.companyID}/${userId}/profile-${Math.floor(
            10000000000 + Math.random() * 90000000000
          )}.jpg`;
          buf = Buffer.from(req.body.profile_image, "base64");
          var data = {
            Bucket: config.credentials.bucket,
            ACL: "public-read",
            Key: name,
            Body: buf,
            ContentEncoding: "base64",
            ContentType: "image/jpeg",
          };

          s3.putObject(data, function (err, data) {
            if (err) {
              console.log(err);
            } else {
              //  console.log(name)
            }
          });
        }
        let profile_image = isBase64(req.body.profile_image, {
          allowEmpty: false,
        })
          ? config.credentials.s3_url + name
          : req.body.profile_image;
        User.updateOne(
          { _id: req.params.id },
          {
            $set: {
              first_name: req.body.firstName,
              last_name: req.body.lastName,
              phone: req.body.phone,
              age: req.body.age,
              gender: req.body.gender,
              profile_image: profile_image,
              country: req.body.country,
              displayName: req.body.displayName,
              address: req.body.address1,
              address_2: req.body.address2,
              city: req.body.city,
              state: req.body.state,
              zipcode: req.body.zipcode,
            },
          },
          (err, users) => {
            if (err) {
              response = { error: true, status: "failed", msg: "failed" };
              res.send(response);
            } else {
              User.find(
                { _id: userId },
                { _id: 0, username: 1, name: 1 },
                function (err, data) {
                  if (err) {
                    response = { error: true, status: "failed", msg: "failed" };
                  } else {
                    response = {
                      error: false,
                      status: "success",
                      msg: "Profile updated successfully",
                    };
                  }
                  res.send(response);
                }
              );
            }
          }
        );
      }
    }
  });
};

// Get all users by user id
exports.getUserDetailsByUserId = (req, res) => {
  User.findById({ deleted: { $ne: 1 }, _id: req.params.id }, (err, user) => {
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
