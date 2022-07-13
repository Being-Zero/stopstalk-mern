const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please tell us your first name!"],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm the password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords are not the same!",
      },
    },
    passwordChangedAt: { type: Date },
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    provider: {
      type: String,
      required: [true, "Please Give a Provider"],
      enum: ["email", "google"],
    },
    Institute: {
      type: String,
    },
    Country: {
      type: String,
    },
    StopStalkHandle: {
      type: String,
      unique: true,
    },
    ReferrersHandle: {
      type: String,
    },
    SocialHandles: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "SocialHandle",
      },
    ],
    role: {
      type: String,
      enum: ["user", "admin", "mod"],
      default: "user",
    },
    rating: {
      type: Number,
      default: 0,
    },
    prev_rating: {
      type: Number,
      default: 0,
    },
    stopstalk_rating: {
      type: Number,
      default: 0,
    },
    stopstalk_prev_rating: {
      type: Number,
      default: 0,
    },
    per_day: {
      type: Number,
      default: 0.0,
    },
    per_day_change: {
      type: Number,
      default: 0.0,
    },
    duplicate_cu: {
      ref: "CustomFriend",
      type: String,
    },
    graph_data_retrieved: {
      type: Boolean,
      default: false,
    },
    refreshed_timestamp: {
      type: Date,
      default: Date.now(),
    },
    tokens: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Token",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObjects: { virtuals: true },
  }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatepassword,
  userPassword
) {
  return await bcrypt.compare(candidatepassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
