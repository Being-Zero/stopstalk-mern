const crypto = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Token = require("../models/Tokens");

const { OAuth2Client } = require("google-auth-library");
const SocialHandle = require("../models/SocialHandle");
const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_SECRET
);

const signToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = async (user, statusCode, res) => {
  const token = signToken(user._id, user.role);

  await Token.create({
    token: token,
    active: true,
    userid: user._id,
  });

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;
  user.tokens = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = async (req, res) => {
  try {
    const u = await User.findOne({ email: req.body.u.email });

    if (u) {
      return res.status(200).json({
        message: `User Already Exists with ${u.provider} provider`,
        provider: u.provider,
        error: true,
      });
    }
    req.body.u.provider = "email";
    if (!req.body.u.StopStalkHandle) {
      req.body.u.StopStalkHandle = `${req.body.u.email.split("@")[0]}-${
        req.body.u.email.split("@")[1].split(".")[0]
      }`;
    }

    const newUser = await User.create(req.body.u);

    let SocialHandles = [];

    console.log(req.body)

    await Promise.all(
      req.body.handles.map(async (el) => {
        if (el.hasOwnProperty('AtCoder')) {
          let r = await SocialHandle.create({
            user_id: newUser._id,
            siteName: "AtCoder",
            userHandle: el.AtCoder,
            lastRetrieved: Date.now(),
          });
          SocialHandles.push(r._id);
        }
        if (el.hasOwnProperty('HackerEarth')) {
          let r = await SocialHandle.create({
            user_id: newUser._id,
            siteName: "HackerEarth",
            userHandle: el.HackerEarth,
            lastRetrieved: Date.now(),
          });
          SocialHandles.push(r._id);
        }
        if (el.hasOwnProperty('HackerRank')) {
          let r = await SocialHandle.create({
            user_id: newUser._id,
            siteName: "HackerRank",
            userHandle: el.HackerRank,
            lastRetrieved: Date.now(),
          });
          SocialHandles.push(r._id);
        }
        if (el.hasOwnProperty('CodeChef')) {
          let r = await SocialHandle.create({
            user_id: newUser._id,
            siteName: "CodeChef",
            userHandle: el.CodeChef,
            lastRetrieved: Date.now(),
          });
          SocialHandles.push(r._id);
        }
        if (el.hasOwnProperty('CodeForces')) {
          let r = await SocialHandle.create({
            user_id: newUser._id,
            siteName: "CodeForces",
            userHandle: el.CodeForces,
            lastRetrieved: Date.now(),
          });
          SocialHandles.push(r._id);
        }
        if (el.hasOwnProperty('UVAHandle')) {
          let r = await SocialHandle.create({
            user_id: newUser._id,
            siteName: "UVAHandle",
            userHandle: el.UVAHandle,
            lastRetrieved: Date.now(),
          });
          SocialHandles.push(r._id);
        }
        if (el.hasOwnProperty('TimusHandle')) {
          let r = await SocialHandle.create({
            user_id: newUser._id,
            siteName: "TimusHandle",
            userHandle: el.TimusHandle,
            lastRetrieved: Date.now(),
          });
          SocialHandles.push(r._id);
        }
        if (el.hasOwnProperty('SpojHandle')) {
          let r = await SocialHandle.create({
            user_id: newUser._id,
            siteName: "SpojHandle",
            userHandle: el.SpojHandle,
            lastRetrieved: Date.now(),
          });
          SocialHandles.push(r._id);
        }
      })
    );
    console.log(
      "🚀 ~ file: AuthController.js ~ line 73 ~ exports.signup= ~ SocialHandles",
      SocialHandles
    );

    const nUser = await User.findByIdAndUpdate(
      newUser._id,
      {
        SocialHandles,
      },
      {
        new: true,
        runValidators: true,
      }
    ).populate({
      path: "SocialHandles"
    })
    console.log(
      "🚀 ~ file: AuthController.js ~ line 160 ~ exports.signup= ~ nUser",
      nUser
    );

    await createSendToken(nUser, 201, res);
  } catch (err) {
    console.log(err);
    res.status(200).json({
      message: "Some Error Occurred!",
      error: err,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(200).json({
        status: "Error",
        error: true,
        message: "Please provide a email or a password",
      });
    }

    const user = await User.findOne({ email }).select("+password").populate({
      path: "SocialHandles"
    });

    if (user && user.provider === "google") {
      return res.status(200).json({
        error: true,
        message: "Please Login using Google..",
      });
    }

    if (!user) {
      return res.status(200).json({
        status: "Error",
        error: true,
        message: "User Doesn't exist with this email",
      });
    }

    if (!(await user.correctPassword(password, user.password))) {
      return res.status(200).json({
        status: "Error",
        error: true,
        message: "Incorrect email or password",
      });
    }

    await createSendToken(user, 200, res);
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      message: "Some Error Occurred!",
      error: true,
    });
  }
};

exports.googleSignin = async (req, res) => {
  try {
    const token = req.body.token;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userid = payload["sub"];

    const user = await User.findOne({ email: payload.email }).select("-id").populate({
      path: "SocialHandles"
    });
    console.log(user);
    if (user && user.provider === "email") {
      return res.status(200).json({
        message: "Please Login using Email..",
        error: true,
      });
    }

    let sto   = payload.email.substring(0, payload.email.lastIndexOf("@"));

    if (!user) {
      let StopStalkHandle = `${payload.email.split("@")[0]}-${
        payload.email.split("@")[1].split(".")[0]
      }`;

      const userData = {
        firstName: payload.given_name,
        lastName: payload.family_name,
        email: payload.email,
        password: userid,
        passwordConfirm: userid,
        provider: "google",
        StopStalkHandle: StopStalkHandle,
      };
      const newUser = await User.create(userData);
      newUser.provider = undefined;
      newUser.role = undefined;
      newUser.id = undefined;
      newUser.__v = undefined;

      await createSendToken(newUser, 201, res);
    }
    if (user && user.provider === "google") {
      user.provider = undefined;
      user.role = undefined;
      user.id = undefined;
      user.__v = undefined;
      await createSendToken(user, 200, res);
    }
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      message: "Some Error Occurred!, Please Try After some time.",
      error: true,
    });
  }
};

exports.logout = async (req, res) => {
  const token = req.body.token;

  await Token.findOneAndDelete({ token: token });

  res.cookie("jwt", "LoggedOut", {
    expires: new Date(Date.now() - 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    status: "success",
    message: "Logged Out",
  });
};

exports.protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    if (!token) {
      return res.status(401).json({
        status: "Error",
        message: "You are not logged in! Please log in to get access.",
      });
    }

    try {
      const f = await Token.findOne({ token: token });

      if (!f || !f.active) {
        return res.status(401).json({
          status: "Error",
          message: "This token has expired. Login again",
        });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({
        message: "error while finding the token",
      });
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return res.status(401).json({
        status: "Error",
        message: "The user belonging to this token does no longer exist.",
      });
    }
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return res.status(401).json({
        status: "Error",
        message: "User recently changed password! Please login again!",
      });
    }

    req.user = currentUser;
    next();
  } catch (err) {
    console.log(err);
    next();
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        status: "Error",
        message: "You do not have permission to perform this action",
      });
    }
    next();
  };
};

exports.forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({
      status: "Error",
      message: "There is no user with that email address.",
    });
  }

  const resetToken = user.createPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  try {
    // const resetUrl = `https://redwood-realtor.herokuapp.com/resetPassword/${resetToken}`;

    // const resetUrl = `http://localhost:4200/resetPassword/${resetToken}`;

    // await new Email(user, resetUrl).sendPasswordReset();

    return res.status(200).json({
      status: "success",
      message: "Email Sent!!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save({ validateBeforeSave: false });

    res.status(500).json({
      status: "Error",
      message: "There was an error while sending the mail, Try again later",
    });
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        status: "Error",
        message: "Token is invalid or has Expired",
      });
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    await createSendToken(user, 200, res);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "Error",
      message: "Some Error Resetting the password, try again later",
    });
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("+password");

    if (
      !(await user.correctPassword(req.body.passwordCurrent, user.password))
    ) {
      res.status(401).json({
        status: "Error",
        message: "Your current password is wrong",
      });
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;

    await user.save();

    await createSendToken(user, 200, res);
  } catch (err) {
    res.status(401).json({
      status: "Error",
      message: "Something Went Wrong",
    });
  }
};

exports.blackListToken = async (req, res) => {
  try {
    const userid = req.user._id;

    await Token.updateMany({ $where: [userid] }, { active: false });

    res.status(200).json({
      message: "Token Blocked",
    });
  } catch (e) {
    console.log(e);
    req.status(400).json({
      message: "some error while blocking token",
      error: e,
    });
  }
};

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};
