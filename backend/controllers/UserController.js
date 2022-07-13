const { path } = require("express/lib/application");
const SocialHandle = require("../models/SocialHandle");
const User = require("../models/User");

exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      new Error("Cannot get User");
    } else {
      res.status(200).json({
        status: "success",
        data: user,
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "Error",
      message: "Cannot get the user!",
    });
  }
};

exports.updateData = async (req, res) => {
  try {
    const { handles, ...data } = req.body;
    console.log(
      "🚀 ~ file: UserController.js ~ line 26 ~ exports.updateData= ~ handles",
      handles
    );

    await User.updateOne({ _id: req.user._id }, data);

    await Promise.all(
      handles.map(async (el) => {
        if (el.hasOwnProperty("AtCoder")) {
          await SocialHandle.updateOne(
            {
              user_id: req.user._id,
              siteName: "AtCoder",
            },
            { userHandle: el.AtCoder,lastRetrieved: Date.now()
            },
            {
              upsert: true,
              new: true,
            }
          );
        }
        if (el.hasOwnProperty("HackerEarth")) {
          await SocialHandle.updateOne(
            {
              user_id: req.user._id,
              siteName: "HackerEarth",
            },
            { userHandle: el.HackerEarth,lastRetrieved: Date.now() },
            {
              upsert: true,
              new: true,
            }
          );
        }
        if (el.hasOwnProperty("HackerRank")) {
          await SocialHandle.updateOne(
            {
              user_id: req.user._id,
              siteName: "HackerRank",
            },
            { userHandle: el.HackerRank,lastRetrieved: Date.now() },
            {
              upsert: true,
              new: true,
            }
          );
        }
        if (el.hasOwnProperty("CodeChef")) {
          await SocialHandle.updateOne(
            {
              user_id: req.user._id,
              siteName: "CodeChef",
            },
            { userHandle: el.CodeChef,lastRetrieved: Date.now() },
            {
              upsert: true,
              new: true,
            }
          );
        }
        if (el.hasOwnProperty("CodeForces")) {
          await SocialHandle.updateOne(
            {
              user_id: req.user._id,
              siteName: "CodeForces",
            },
            { userHandle: el.CodeForces,lastRetrieved: Date.now() },
            {
              upsert: true,
              new: true,
            }
          );
        }
        if (el.hasOwnProperty("UVAHandle")) {
          await SocialHandle.updateOne(
            {
              user_id: req.user._id,
              siteName: "UVAHandle",
            },
            { userHandle: el.UVAHandle,lastRetrieved: Date.now() },
            {
              upsert: true,
              new: true,
            }
          );
        }
        if (el.hasOwnProperty("TimusHandle")) {
          await SocialHandle.updateOne(
            {
              user_id: req.user._id,
              siteName: "TimusHandle",
            },
            { userHandle: el.TimusHandle,lastRetrieved: Date.now() },
            {
              upsert: true,
              new: true,
            }
          );
        }
        if (el.hasOwnProperty("SpojHandle")) {
          await SocialHandle.updateOne(
            {
              user_id: req.user._id,
              siteName: "SpojHandle",
            },
            { userHandle: el.SpojHandle,lastRetrieved: Date.now() },
            {
              upsert: true,
              new: true,
            }
          );
        }
      })
    );

    let SocialHandles = await SocialHandle.find({
      user_id: req.user._id,
    }).select("_id");

    console.log(
      "🚀 ~ file: UserController.js ~ line 147 ~ exports.updateData= ~ SocialHandles",
      SocialHandles
    );

    let updatedUser1;

    User.findOneAndUpdate(
      { _id: req.user._id },
      { SocialHandles },
      {
        new: true,
      }
    )
      .then(() => {
        User.find({ _id: req.user._id })
          .populate({ path: "SocialHandles" })
          .then((e) => {
            updatedUser1 = e;
            return res.status(200).json({
              message: "updated successfully",
              error: false,
              user: updatedUser1,
            });
          });
      })
      .catch((e) => console.log(e));
  } catch (e) {
    return res.status(200).json({
      message: "Some Error Occurred while updating",
      error: true,
    });
  }
};

exports.getUserHandles = async (req, res) => {
  try {
    let data = await User.find({ _id: req.user._id }).populate({
      path: "SocialHandles",
    });

    return res.status(200).json({
      message: "Success",
      error: false,
      data,
    });
  } catch (e) {
    console.log(e);

    return res.status(200).json({
      message: "Some error Occurred",
      error: true,
    });
  }
};
