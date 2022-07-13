const user = require('../models/User');
const following = require('../models/Following');
const authController = require('../controllers/AuthController');
exports.leaderboard = async (req, res, next) => {
    try {
        user_data = req.user === undefined ? null : req.user;
        institute = req.query.q === undefined ? null : req.query.q;
        if (user_data) {
            if (institute)
                global = await user.find({ Institute: institute, sort: { stopstalk_rating: -1 } })
            else
                global = await user.find({ sort: { stopstalk_rating: -1 } })

            followers_data = await following.find({ user_id: user_data._id });
            follower_ids = [user_data._id]
            for (let i = 0; i < followers_data.length; i++) {
                follower_ids.push(followers_data[i]._id);
            }

            if (institute)
                friends = await user.find({ $and: [{ _id: { $in: follower_ids } }, { Institute: institute }], sort: { stopstalk_rating: -1 } })
            else
                friends = await user.find({ _id: { $in: follower_ids }, sort: { stopstalk_rating: -1 } })

            global_rank = await get_global_rank(await global, await user_data);
            friends_rank = await get_friends_rank(await friends, await user_data);

            result = {
                "friends": friends,
                "global": global,
                "friends_rank": friends_rank,
                "global_rank": global_rank,
                "user_data": user_data
            }
        }
        else {
            if (institute)
                global = await user.find({ Institute: institute, sort: { stopstalk_rating: -1 } })
            else
                global = await user.find({ sort: { stopstalk_rating: -1 } })

            result = {
                "friends": [],
                "global": global
            }
        }
        res.status(200).json({
            status: "success",
            data: result
        })
    } catch (err) {
        console.log(err);
        console.log("in leaderboard");
        res.status(500).json({
            status: "failure",
            msg: str(err)
        })
    }
}

async function get_global_rank(global, user_data) {
    for (let i = 0; i < global.length; i++) {
        if (global[i].StopStalkHandle == user_data.StopStalkHandle) {
            return i + 1;
        }
    }
    return -1;
}

async function get_friends_rank(friends, user_data) {
    for (let i = 0; i < friends.length; i++) {
        if (friends[i].StopStalkHandle == user_data.StopStalkHandle)
            return i + 1;
    }
    return -1;
}