const express = require("express");
const router = express.Router();

// MODELS
const User = require("../models/User");
const ContactUs = require("../models/ContactUs");
const AllInstitutes = require("../models/AllInstitutes");
const SocialHandle = require("../models/SocialHandle");
const Following = require("../models/Following");

router.get("/users", (req, res) => {
  console.log("Get all users");
  User.find({}).then((users) => {
    res.send(users);
  });
});

router.get("/get-institutes", (req, res) => {
  console.log("Get all institutes");
  AllInstitutes.find({}).then((institutes) => {
    res.send(institutes);
  });
});
// router.post("/post-institutes", (req, res) => {
//   console.log("Post institutes");
//   for(let i = 0; i < data.length; i++) {
//     const newInstitute = new AllInstitutes({
//       institute: data[i], 
//     });
//     newInstitute.save();
//   }
//   res.send("DONE");
// });


router.post("/add-social-handle", (req, res) => {
  console.log("Add social handle");
  const { user_id, siteName, userHandle, lastRetrieved } = req.body;
  const socialHandle = new SocialHandle({
    user_id,
    siteName,
    userHandle,
    lastRetrieved
  });
  socialHandle.save().then((socialHandleDoc) => {
    res.send(socialHandleDoc);
  });
});


router.post("/searchfriends", (req, res) => {
  console.log("Post searchfriends");
  const data = [];
  const { mainuser_id, q, institute, country } = req.body.params;
  const name = new RegExp(q, "i");
  const arguments = {};
  if(institute != "Institute") 
    arguments.Institute = institute;
  if(country != "Country")
    arguments.Country = country;
  if(q) {
    arguments.$or = [{ StopStalkHandle: name },{ firstName: name }, { lastName: name }];
  }
  User.find(arguments).then((users) => {
    let length = users.length;
    if(length == 0) {
      res.send(data);
      return;
    }
    let i = 0;
    for(user of users) {
      const promise = new Promise((resolve, reject) => {
        const details = { user_id: user._id, StopStalkHandle: user.StopStalkHandle, firstName: user.firstName, lastName: user.lastName };
        socialHandles(user._id, mainuser_id, details, (details, handles, areFriends) => {
          resolve([details, handles, areFriends]);
        });
      });
      promise.then((result) => {
        i += 1;
        data.push(result);
        if(i === length) {
          res.send(data);
        }
      });
    }
  });
});
function socialHandles(user_id, mainuser_id, details, callback) {
  let handles = [];
  let areFriends = false;
  SocialHandle.find({ user_id }).then((socialHandles) => {
    for(socialHandle of socialHandles) {
      handles.push({ siteName: socialHandle.siteName, userHandle: socialHandle.userHandle});
    }
  })
  .then(() => {
    Following.find({ user_id: user_id, follower_id: mainuser_id }).then((followings) => {
      if(followings.length > 0) {
        areFriends = true;
      }
    })
    .then(() => {
        callback(details, handles, areFriends);
    });
  });
}


router.post("/add-follower", (req, res) => {
  console.log("Add follower");
  const { user_id, follower_id } = req.body;
  const following = new Following({
    user_id,
    follower_id
  });
  // add if not exist
  Following.find({ user_id: user_id, follower_id: follower_id }).then((followings) => {
    if(followings.length == 0) {
      following.save().then((followingDoc) => {
        res.send("true");
      });
    }
    else 
      console.log("Already Record is There");
  });
});
router.post("/remove-follower", (req, res) => {
  console.log("Remove follower");
  const { user_id, follower_id } = req.body;
  Following.deleteOne({ user_id, follower_id }).then((followingDoc) => {
    res.send("true");
  });
});

router.get("/get-following", (req, res) => {
  console.log("Get following");
  const { user_id } = req.query;
  let following = [];
  Following.find({ follower_id: user_id }).then((followings) => {
    User.find({ _id: { $in: followings.map(following => following.user_id) } }).then((users) => {
      for(user of users) {
        following.push({ user_id: user._id, StopStalkHandle: user.StopStalkHandle, firstName: user.firstName, lastName: user.lastName, amIFollowing: true});
      }
      res.send(following);
    });
  });
});
router.get("/get-follower", (req, res) => {
  console.log("Get follower");
  const { user_id } = req.query;
  let follower = [];
  Following.find({ user_id: user_id }).then((followings) => {
    User.find({ _id: { $in: followings.map(following => following.follower_id) } }).then((users) => {
      for(user of users) {
        follower.push({ user_id: user._id, StopStalkHandle: user.StopStalkHandle, firstName: user.firstName, lastName: user.lastName, amIFollowing: false});
      }
      res.send(follower);
    });
  });
});


module.exports = router;
