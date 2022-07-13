const {
  GetLastSubmissionForTrending,
} = require("../utils/GetLastSubmissionForTrending");

const Submission = require("../models/Submission");
const Problem = require("../models/Problem");

exports.getById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("🚀 ~ file: ProblemController.js ~ line 11 ~ exports.getById= ~ req.params", req.params)
    
    const prob = await Problem.findById(id);
    return res.json(prob);
  } catch (E) {
    console.log(E);

    return res.json({
      error: true,
    });
  }
};

exports.getAllProblems = async (req, res) => {
  console.log("running");
  try {
    console.log(req.body.name);
    const data = await Problem.find({
      name: new RegExp(req.body.name, "i"),
    }).limit(30);

    return res.json({
      error: false,
      data,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      error: true,
      message: error,
    });
  }
};

exports.GlobalTrending = async (req, res) => {
  try {
    // data has the recent submissions for last 30 days _/
    const data = await GetLastSubmissionForTrending();

    // take a problem from submission _/
    let i = 0;
    let n = data.length;
    console.log(
      "🚀 ~ file: ProblemController.js ~ line 13 ~ exports.GlobalTrending= ~ n",
      n
    );

    let data2 = data.map((el) => {
      let problem = el.problem_id;

      // find out how many submission where there for the problem _/
      let total_problem_submissions = data.filter(
        (e) => e.problem_id._id === problem._id
      ).length;

      // for a problem find the number of users who submitted successfully _/
      let total_user_success = data.filter(
        (e) =>
          e.problem_id._id === problem._id &&
          e.status.toLowerCase() === "accepted"
      ).length;

      return [
        el.problem_id._id,
        el.problem_id.name,
        total_problem_submissions,
        total_user_success,
      ];
    });

    var d = [];
    for (var prop of data2) {
      !d.some((value) => value && value[0] === prop[0])
        ? d.push(prop)
        : d.forEach((value) => {
            if (value[0] === prop[0]) {
              value[2] += prop[2];
              value[3] += prop[3];
            }
          });
    }

    let finalData = [];

    finalData = d.map((el) => {
      return {
        id: el[0],
        name: el[1],
        recentSub: el[2],
        users: el[3],
      };
    });

    finalData.sort(function (a, b) {
      return a["users"] - b["users"];
    });

    finalData.reverse();

    return res.send(finalData.slice(0, 15));
  } catch (e) {
    console.log(e);
  }
};

exports.filter = async (req, res) => {
  try {
    console.log("runnign");
    let {
      problem_name,
      stopstalk_handle,
      status,
      site,
      lang,
      start_date,
      end_date,
    } = req.body;

    console.log({
      problem_name,
      stopstalk_handle,
      status,
      site,
      lang,
      start_date,
      end_date,
    });

    let data = await Submission.find({
      $and: [
        {
          $or: [
            {
              problem_name: {
                $regex: ".*" + problem_name + ".*",
                $options: "i",
              },
            },
            {
              stopstalk_handle: {
                $regex: ".*" + stopstalk_handle + ".*",
                $options: "i",
              },
            },
          ],
        },
        {
          $or: [
            { status: { $in: status } },
            { site: { $in: site } },
            { lang: { $in: lang } },
            { time_stamp: { $gte: start_date, $lte: end_date } },
          ],
        },
      ],
    })
      .populate("problem_id")
      .populate("user_id")
      .limit(40);

    // let data = await Submission.find({
    //   problem_name: { $regex: ".*" + problem_name + ".*", $options: "i" },
    //   stopstalk_handle: {
    //     $regex: ".*" + stopstalk_handle + ".*",
    //     $options: "i",
    //   },
    //   status: { $in: status, $options: "i" },
    //   site: { $in: site, $options: "i" },
    //   lang: { $in: lang, $options: "i" },
    //   time_stamp: { $gte: start_date, $lte: end_date },
    // })
    //   .populate("problem_id")
    //   .populate("user_id")
    //   .limit(40);

    console.log(data);

    res.json({
      data: data,
    });
  } catch (e) {}
};
