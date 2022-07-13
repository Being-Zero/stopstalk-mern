const Submission = require("../models/Submission");
const Tag = require("../models/Tag");
const ProblemSetter = require("../models/ProblemSetter");
const SocialHandle = require("../models/SocialHandle");
const Problem = require("../models/Problem");

exports.getPieChartData = async (req, res, next) => {
    try {
        const accepted = await Submission.aggregate([{ $match: { $and: [{ user_id: req.user._id }, { status: { $in: ["accepted", "Accepted"] } }] } }, { $group: { _id: null, count: { $sum: 1 } }, },])
        const wrongAnswer = await Submission.aggregate([{ $match: { $and: [{ user_id: req.user._id }, { status: "wrong answer" }] } }, { $group: { _id: null, count: { $sum: 1 } } }])
        const compilationError = await Submission.aggregate([{ $match: { $and: [{ user_id: req.user._id }, { status: "compilation error" }] } }, { $group: { _id: null, count: { $sum: 1 } } }])
        const runtimeError = await Submission.aggregate([{ $match: { $and: [{ user_id: req.user._id }, { status: { $in: ["runtime error(NZEC)", "runtime error(SIGFPE)", "runtime error(SIGXFSZ)", "runtime error(OTHER)"] } }] } }, { $group: { _id: null, count: { $sum: 1 } } }])
        const memoryLimitExceeded = await Submission.aggregate([{ $match: { $and: [{ user_id: req.user._id }, { status: "runtime error(SIGSEGV)" }] } }, { $group: { _id: null, count: { $sum: 1 } } }])
        const timeLimitExceeded = await Submission.aggregate([{ $match: { $and: [{ user_id: req.user._id }, { status: "time limit exceeded" }] } }, { $group: { _id: null, count: { $sum: 1 } } }])

        res.status(200).json({
            status: "success",
            data: {
                "accepted": accepted[0] ? accepted[0].count : 0,
                "wrongAnswer": wrongAnswer[0] ? wrongAnswer[0].count : 0,
                "compilationError": compilationError[0] ? compilationError[0].count : 0,
                "runtimeError": runtimeError[0] ? runtimeError[0].count : 0,
                "memoryLimitExceeded": memoryLimitExceeded[0] ? memoryLimitExceeded[0].count : 0,
                "timeLimitExceeded": timeLimitExceeded[0] ? timeLimitExceeded[0].count : 0,
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "failure",
            msg: str(err)
        });
    }
}
exports.getSolvedUnsolvedData = async (req, res, next) => {
    try {
        const all_tags = ["Dynamic Programming", "Greedy", "Strings", "Hashing", "Bit Manipulation", "Trees", "Alogrithms", "Data Structures", "Math", "Implementation"];
        const dp = await Tag.find({
            value: "Dynamic Programming"
        }).distinct("problem_id")
        const greedy = await Tag.find({
            value: "Greedy"
        }).distinct("problem_id")
        const strings = await Tag.find({
            value: "Strings"
        }).distinct("problem_id")
        const hashing = await Tag.find({
            value: "Hashing"
        }).distinct("problem_id")
        const bit_manipulation = await Tag.find({
            value: "Bit Manipulation"
        }).distinct("problem_id")
        const trees = await Tag.find({
            value: "Trees"
        }).distinct("problem_id")
        const algorithms = await Tag.find({
            value: "Alogrithms"
        }).distinct("problem_id")
        const data_structures = await Tag.find({
            value: "Data Structures"
        }).distinct("problem_id")
        const math = await Tag.find({
            value: "Math"
        }).distinct("problem_id")
        const implementation = await Tag.find({
            value: "Implementation"
        }).distinct("problem_id")
        const miscellaneous = await Tag.find({
            value: { $nin: all_tags }
        }).distinct("problem_id")

        const totalProblems = await Submission.find({ user_id: req.user._id }).distinct("problem_id")
        const solvedProblems = await Submission.find({ $and: [{ user_id: req.user._id }, { status: { $in: ["accepted", "Accepted", "AC"] } }] }).distinct("problem_id")
        const unsolvedProblems = await Problem.find(
            {
                $and: [
                    { _id: { $nin: solvedProblems } },
                    { _id: { $in: totalProblems } }
                ]
            }
        ).distinct("_id")

        let solved = {}
        solved["dp"] = await Problem.find({ $and: [{ _id: { $in: solvedProblems } }, { _id: { $in: dp } }] })
        solved["greedy"] = await Problem.find({ $and: [{ _id: { $in: solvedProblems } }, { _id: { $in: greedy } }] })
        solved["strings"] = await Problem.find({ $and: [{ _id: { $in: solvedProblems } }, { _id: { $in: strings } }] })
        solved["hashing"] = await Problem.find({ $and: [{ _id: { $in: solvedProblems } }, { _id: { $in: hashing } }] })
        solved["bit_manipulation"] = await Problem.find({ $and: [{ _id: { $in: solvedProblems } }, { _id: { $in: bit_manipulation } }] })
        solved["trees"] = await Problem.find({ $and: [{ _id: { $in: solvedProblems } }, { _id: { $in: trees } }] })
        solved["algorithms"] = await Problem.find({ $and: [{ _id: { $in: solvedProblems } }, { _id: { $in: algorithms } }] })
        solved["data_structures"] = await Problem.find({ $and: [{ _id: { $in: solvedProblems } }, { _id: { $in: data_structures } }] })
        solved["math"] = await Problem.find({ $and: [{ _id: { $in: solvedProblems } }, { _id: { $in: math } }] })
        solved["implementation"] = await Problem.find({ $and: [{ _id: { $in: solvedProblems } }, { _id: { $in: implementation } }] })
        solved["miscellaneous"] = await Problem.find({ $and: [{ _id: { $in: solvedProblems } }, { _id: { $in: miscellaneous } }] })

        let unsolved = {}
        unsolved["dp"] = await Problem.find({ $and: [{ _id: { $in: unsolvedProblems } }, { _id: { $in: dp } }] })
        unsolved["greedy"] = await Problem.find({ $and: [{ _id: { $in: unsolvedProblems } }, { _id: { $in: greedy } }] })
        unsolved["strings"] = await Problem.find({ $and: [{ _id: { $in: unsolvedProblems } }, { _id: { $in: strings } }] })
        unsolved["hashing"] = await Problem.find({ $and: [{ _id: { $in: unsolvedProblems } }, { _id: { $in: hashing } }] })
        unsolved["bit_manipulation"] = await Problem.find({ $and: [{ _id: { $in: unsolvedProblems } }, { _id: { $in: bit_manipulation } }] })
        unsolved["trees"] = await Problem.find({ $and: [{ _id: { $in: unsolvedProblems } }, { _id: { $in: trees } }] })
        unsolved["algorithms"] = await Problem.find({ $and: [{ _id: { $in: unsolvedProblems } }, { _id: { $in: algorithms } }] })
        unsolved["data_structures"] = await Problem.find({ $and: [{ _id: { $in: unsolvedProblems } }, { _id: { $in: data_structures } }] })
        unsolved["math"] = await Problem.find({ $and: [{ _id: { $in: unsolvedProblems } }, { _id: { $in: math } }] })
        unsolved["implementation"] = await Problem.find({ $and: [{ _id: { $in: unsolvedProblems } }, { _id: { $in: implementation } }] })
        unsolved["miscellaneous"] = await Problem.find({ $and: [{ _id: { $in: unsolvedProblems } }, { _id: { $in: miscellaneous } }] })

        return res.status(200).json({
            status: "success",
            data: {
                "solvedData": solved,
                "unsolvedData": unsolved,
            }
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            status: "failed",
            msg: str(err)
        });
    }
}

exports.getSolvedCount = async (req, res, next) => {
    try {
        const HackerRank = await Submission.find({ $and: [{ user_id: req.user._id }, { status: { $in: ["accepted", "Accepted", "AC"] } }, { site: "HackerRank" }] }).distinct("problem_id")
        const CodeChef = await Submission.find({ $and: [{ user_id: req.user._id }, { status: { $in: ["accepted", "Accepted", "AC"] } }, { site: "CODECHEF" }] }).distinct("problem_id")
        const Spoj = await Submission.find({ $and: [{ user_id: req.user._id }, { status: { $in: ["accepted", "Accepted", "AC"] } }, { status: "SPOJ" }] }).distinct("problem_id")
        const CodeForces = await Submission.find({ $and: [{ user_id: req.user._id }, { status: { $in: ["accepted", "Accepted", "AC"] } }, { site: "CODEFORCES" }] }).distinct("problem_id")
        const TotalSolved = await Submission.find({ $and: [{ user_id: req.user._id }, { status: { $in: ["accepted", "Accepted", "AC"] } }] }).distinct("problem_id")
        const TotalProblems = await Submission.find({ user_id: req.user._id }).distinct("problem_id")
        const authored = await ProblemSetter.find({ handle: req.user.StopStalkHandle }).distinct("problem_id")
        const codechefTotal = await Submission.find({ $and: [{ user_id: req.user._id }, { site: "CODECHEF" }] })
        const hackerrankTotal = await Submission.find({ $and: [{ user_id: req.user._id }, { site: "HackerRank" }] })
        const codeforcesTotal = await Submission.find({ $and: [{ user_id: req.user._id }, { site: "CODEFORCES" }] })
        const spojTotal = await Submission.find({ $and: [{ user_id: req.user._id }, { site: "SPOJ" }] })

        res.status(200).json({
            status: "success",
            data: {
                "HackerRank": HackerRank ? HackerRank.length : 0,
                "CodeChef": CodeChef ? CodeChef.length : 0,
                "Spoj": Spoj ? Spoj.length : 0,
                "CodeForces": CodeForces ? CodeForces.length : 0,
                "TotalSolved": TotalSolved ? TotalSolved.length : 0,
                "TotalProblems": TotalProblems ? TotalProblems.length : 0,
                "Authored": authored ? authored.length : 0,
                "HackerRankAccuracy": HackerRank && hackerrankTotal ? (HackerRank.length / hackerrankTotal.length) * 100 : 0,
                "CodeChefAccuracy": CodeChef && codechefTotal ? (CodeChef.length / codechefTotal.length) * 100 : 0,
                "SpojAccuracy": Spoj && spojTotal ? (Spoj.length / spojTotal.length) * 100 : 0,
                "CodeForcesAccuracy": CodeForces && codeforcesTotal ? (CodeForces.length / codeforcesTotal.length) * 100 : 0
            }
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            status: "failure",
            msg: str(err)
        });
    }


}

exports.getStats = async (req, res, next) => {
    console.log("Inside calendar data");
    const submissions = await Submission.find({ user_id: req.user._id }).select("time_stamp problem_id status site").sort({ time_stamp: 1 })
    const problems_authored_count = await ProblemSetter.find({ handle: req.user.StopStalkHandle }).distinct("problem_id")
    const codechefHandle = await SocialHandle.findOne({ $and: [{ user_id: req.user._id }, { siteName: "CodeChef" }] }).select("userHandle");
    const hackerrankHandle = await SocialHandle.findOne({ $and: [{ user_id: req.user._id }, { siteName: "HackerRank" }] }).select("userHandle");
    const codeforcesHandle = await SocialHandle.findOne({ $and: [{ user_id: req.user._id }, { siteName: "CodeForces" }] }).select("userHandle");

    solved_problem_ids = new Set()
    all_attempted_pids = new Set()
    sites_solved_count = {}
    site_accuracies = {}
    all_sites = ["CODECHEF", "HackerRank", "CODEFORCES", "SPOJ"]
    all_sites.forEach(site => {
        sites_solved_count[site] = new Set()
        site_accuracies[site] = { "accepted": 0, "total": 0 }
    })
    status_percentages = {}
    final_rating = {}
    calendar_data = {}
    curr_day_streak = max_day_streak = 0
    curr_accepted_streak = max_accepted_streak = 0

    if (submissions.length == 0) {
        return res.status(200).json({
            "rating_history": [],
            "curr_accepted_streak": 0,
            "max_accepted_streak": 0,
            "curr_day_streak": 0,
            "max_day_streak": 0,
            "solved_counts": {},
            "status_percentages": {},
            "site_accuracies": {},
            "solved_problems_count": 0,
            "total_problems_count": 0,
            "calendar_data": {},
            "problems_authored_count": 0
        });
    }
    console.log("Inside calendar data submissions");
    INITIAL_DATE = new Date("2019-06-06 00:00:00")
    current_rating_parts = {
        "curr_day_streak": 0,
        "max_day_streak": 0,
        "curr_accepted_streak": 0,
        "max_accepted_streak": 0,
        "solved": 0,
        "total_submissions": 0,
        "current_per_day": 0,
        "accepted_submissions": 0
    }

    date_iterator = INITIAL_DATE
    end_date = new Date()
    submission_iterator = 0

    function _populate_rating(current_rating_parts, date) {
        if (current_rating_parts["total_submissions"] == 0) {
            return;
        }
        current_rating_parts["solved"] = solved_problem_ids.size
        current_rating_parts["curr_per_day"] = current_rating_parts["total_submissions"] / (((date.getTime() - INITIAL_DATE.getTime()) / (1000 * 60 * 60 * 24)) + 1)
        rating_components = get_stopstalk_rating(current_rating_parts)
        final_rating[date.toISOString().split("T")[0]] = rating_components["components"]
    }

    function get_stopstalk_rating(parts) {
        WEIGHTING_FACTORS = {
            "curr_day_streak": 40 * 10,
            "max_day_streak": 20 * 10,
            "solved": 1 * 23,
            "accuracy": 5 * 35,
            "attempted": 2 * 2,
            "curr_per_day": 1000 * 20
        }

        rating_components = [
            parts["curr_day_streak"] * WEIGHTING_FACTORS["curr_day_streak"],
            parts["max_day_streak"] * WEIGHTING_FACTORS["max_day_streak"],
            parts["solved"] * WEIGHTING_FACTORS["solved"],
            ((parts["accepted_submissions"] * 100 / parts["total_submissions"]) * WEIGHTING_FACTORS["accuracy"]).toFixed(2),
            (parts["total_submissions"] - parts["accepted_submissions"]) * WEIGHTING_FACTORS["attempted"],
            (parts["curr_per_day"] * WEIGHTING_FACTORS["curr_per_day"]).toFixed(2)
        ]

        return {
            "components": rating_components,
            "total": rating_components.reduce((a, b) => a + b)
        }
    }

    while (date_iterator.toISOString().split("T")[0] <= end_date.toISOString().split("T")[0]) {

        valid_date_for_day_streak = false
        day_submission_count = 0
        statuses_count = {}

        while ((submission_iterator < submissions.length) && (new Date(submissions[submission_iterator]["time_stamp"]).toISOString().split("T")[0] === date_iterator.toISOString().split("T")[0])) {
            submission = submissions[submission_iterator]

            if (!all_attempted_pids.has(submission["problem_id"].toString())) {
                all_attempted_pids.add(submission["problem_id"].toString())
            }

            if (status_percentages.hasOwnProperty(submission["status"])) {
                status_percentages[submission["status"]] += 1
            } else {
                status_percentages[submission["status"]] = 1
            }

            if (statuses_count.hasOwnProperty(submission["status"])) {
                statuses_count[submission["status"]] += 1
            } else {
                statuses_count[submission["status"]] = 1
            }

            site_accuracies[submission["site"]]["total"] += 1

            current_rating_parts["total_submissions"] += 1

            if (submission["status"] == "AC" || submission["status"] == "accepted" || submission["status"] == "Accepted") {

                if (!sites_solved_count[submission["site"]].has(submission["problem_id"].toString())) {
                    sites_solved_count[submission["site"]].add(submission["problem_id"].toString())
                    site_accuracies[submission["site"]]["accepted"] += 1
                }

                current_rating_parts["accepted_submissions"] += 1
                current_rating_parts["curr_accepted_streak"] += 1
                current_rating_parts["max_accepted_streak"] = Math.max(current_rating_parts["max_accepted_streak"], current_rating_parts["curr_accepted_streak"])

                if (!solved_problem_ids.has(submission["problem_id"].toString())) {
                    solved_problem_ids.add(submission["problem_id"].toString())
                    valid_date_for_day_streak |= true
                } else {
                    valid_date_for_day_streak |= false
                }
            } else {
                valid_date_for_day_streak |= true
                current_rating_parts["curr_accepted_streak"] = 0
            }
            submission_iterator += 1
            day_submission_count += 1
        }

        if ((day_submission_count === 0 || valid_date_for_day_streak === false) && (current_rating_parts["curr_day_streak"] > 0)) {
            current_rating_parts["curr_day_streak"] = 0
        }

        if (day_submission_count > 0) {
            statuses_count["count"] = day_submission_count
            calendar_data[date_iterator.toISOString().split("T")[0]] = statuses_count
        }

        if (valid_date_for_day_streak) {
            current_rating_parts["curr_day_streak"] = 1
            current_rating_parts["max_day_streak"] = Math.max(current_rating_parts["max_day_streak"], current_rating_parts["curr_day_streak"])
        }

        curr_day_streak = current_rating_parts["curr_day_streak"]
        max_day_streak = current_rating_parts["max_day_streak"]

        curr_accepted_streak = current_rating_parts["curr_accepted_streak"]
        max_accepted_streak = current_rating_parts["max_accepted_streak"]

        _populate_rating(current_rating_parts, date_iterator)
        date_iterator = new Date(date_iterator.setDate(date_iterator.getDate() + 1))
    }
    all_sites.forEach(site => {
        sites_solved_count[site] = sites_solved_count[site].size
        if (site_accuracies[site]["total"] != 0) {
            accepted = site_accuracies[site]["accepted"]
            if (accepted == 0) {
                site_accuracies[site] = "0"
            } else {
                val = (accepted / site_accuracies[site]["total"]) * 100
                site_accuracies[site] = val.toFixed(2)
            }
        } else {
            site_accuracies[site] = "-"
        }
    })
    res.status(200).json({
        "rating_history": Object.entries(final_rating),
        "curr_accepted_streak": curr_accepted_streak,
        "max_accepted_streak": max_accepted_streak,
        "curr_day_streak": curr_day_streak,
        "max_day_streak": max_day_streak,
        "solved_counts": sites_solved_count,
        "status_percentages": status_percentages,
        "site_accuracies": site_accuracies,
        "solved_problems_count": solved_problem_ids.size,
        "total_problems_count": all_attempted_pids.size,
        "calendar_data": calendar_data,
        "problems_authored_count": problems_authored_count.length,
        "hackerrank_handle": hackerrankHandle,
        "codechef_handle": codechefHandle,
        "codeforces_handle": codeforcesHandle
    })
}