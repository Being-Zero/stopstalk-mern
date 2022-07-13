const Submission = require("../models/Submission");

exports.GetLastSubmissionForTrending = async () => {
  try {
    let twoDaysBefore = Date.now() - 100 * 24 * 3600 * 1000;
    twoDaysBefore = new Date(twoDaysBefore);
    let today = Date.now();
    today = new Date(today);

    console.info(twoDaysBefore, today);

    return await Submission.find({
      time_stamp: { $gte: twoDaysBefore, $lte: today },
    })
      .populate({
        path: "problem_id",
      })
      .sort({ time_stamp: -1 });

      
  } catch (e) {
    console.log(e);
    return { error: true };
  }
};

exports.GetLastSubmissionForTrendingFriends = async () => {
  try {
    let twoDaysBefore = Date.now() - 100 * 24 * 3600 * 1000;
    twoDaysBefore = new Date(twoDaysBefore);
    let today = Date.now();
    today = new Date(today);

    console.info(twoDaysBefore, today);

    return await Submission.find({
      time_stamp: { $gte: twoDaysBefore, $lte: today },
    })
      .populate({
        path: "problem_id",
      })
      .sort({ time_stamp: -1 });

      
  } catch (e) {
    console.log(e);
    return { error: true };
  }
};
