const cron = require("node-cron");
const Submission = require("../models/Submission");
const SocialHandles = require("../models/SocialHandle");
const codeforcescrawler = require("../controllers/Codeforcescrawler");
const User = require("../models/User");
const Problem = require("../models/Problem");
const ProblemDifficulty = require("../models/ProblemDifficulty");
const Tags = require("../models/Tag");
const request = require("request-promise");
const cheerio = require("cheerio");
const axios = require("axios");
const ProblemSetter = require("../models/ProblemSetter");
const convertTime = (timeStr) => {
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":");
  if (hours === "12") {
    hours = "00";
  }
  if (modifier === "PM") {
    hours = parseInt(hours, 10) + 12;
  }
  return `${hours}:${minutes}`;
};

const getDifficulty = (difficulty) => {
  switch (difficulty) {
    case "Cakewalk":
      return 1;
      break;
    case "Simple":
      return 2;
      break;
    case "Easy":
      return 3;
      break;
    case "Easy-Medium":
      return 4;
      break;
    case "Medium":
      return 5;
      break;
    case "Medium-Hard":
      return 6;
      break;
    case "Hard":
      return 7;
      break;
    case "Super-Hard":
      return 8;
      break;
    case "Challenge":
      return 9;
      break;
    default:
      return 0;
  }
};

const codechefSubmissionScrapper = async () => {
  try {
    let final_break = 0;
    const user = await SocialHandles.findOne({ siteName: "CodeChef" })
      .sort({ lastRetrieved: 1 })
      .limit(1);
    if (!user) {
      console.log("No Users Available with CodeChef Handle");
      return;
    }
    console.log(user.userHandle);

    await SocialHandles.findOneAndUpdate(
      { _id: user._id },
      { lastRetrieved: new Date() }
    );

    const data = await request.get(
      `https://www.codechef.com/recent/user?page=0&user_handle=${user.userHandle}`
    );
    const $1 = cheerio.load(data);
    const pages = parseInt($1("body").text().slice(12, 14));

    const invalid = $1("table > tbody > tr > td").attr("title").trim();
    if (invalid === "No Recent Activity") {
      console.log("Invalid Handle");
      return;
    }
    for (let i = 0; i <= pages; i++) {
      const page_data = await request.get(
        `https://www.codechef.com/recent/user?page=${i}&user_handle=${user.userHandle}`
      );
      const $ = cheerio.load(page_data);

      var rows = $("table tbody").find("tr");

      for (let j = 1; j < rows.length; j++) {
        let submissions = $(`table tr:nth-child(${j})  td:nth-child(1)`)
          .attr("title")
          .replace(/\\n/g, "")
          .trim()
          .split(" ");

        var updt_sub_time;
        if (
          submissions.includes("min") ||
          submissions.includes("sec") ||
          submissions.includes("hours")
        ) {
          updt_sub_time = new Date().toISOString();
        } else {
          const time = submissions[0] + " " + submissions[1];
          const date = submissions[2].split("\\/");
          convertedTime = convertTime(time);

          updt_sub_time = new Date(
            "20" + date[2],
            date[1],
            date[0],
            convertedTime[0],
            convertedTime[1]
          );
        }

        const problem_id = $(`table tr:nth-child(${j})  td:nth-child(2)`)
          .attr("title")
          .trim();
        const points = $(`table tr:nth-child(${j}) td:nth-child(3)`)
          .attr("title")
          .replace(/[{()}]/g, "");
        const status = $(`table tr:nth-child(${j}) td:nth-child(3) span`).attr(
          "title"
        );
        const lang = $(`table tr:nth-child(${j}) td:nth-child(4)`)
          .attr("title")
          .trim();
        const sub_id = $(`table tr:nth-child(${j}) td:nth-child(5) a`)
          .attr("href")
          .split("/");
        const problem_link = `https://www.codechef.com/problems/${problem_id}`;
        const problem_editorial = `https://discuss.codechef.com/problems/${problem_id}`;

        const data = await request.get(
          `https://www.codechef.com/api/contests/PRACTICE/problems/${problem_id}`
        );

        const single_problem = JSON.parse(data);

        if (single_problem.status === "error") {
          console.log("Invalid Problem");
          continue;
        }

        

        const statement = cheerio
          .load(single_problem.problemComponents.statement)
          .text();
        
        let input = []
        let output = []
        if (single_problem.problemComponents.sampleTestCases.length > 0) {
          input =Object.values(cheerio
            .load(single_problem.problemComponents.sampleTestCases[0].input)
            .text().trim().split('\n'));
          
          output = Object.values(cheerio
            .load(single_problem.problemComponents.sampleTestCases[0].output)
            .text().trim().split('\n'));
            var explation = cheerio.load(
              single_problem.problemComponents.sampleTestCases[0].explanation
            ).text();
          
        }
        
        const tags = cheerio.load(single_problem.tags).text();
        
        const date_added = single_problem.date_added.split("-");
        
       
        const difficulty = getDifficulty(
          single_problem.problem_difficulty_level
        );        
        const author = single_problem.problem_author;
        const problemName = single_problem.problem_name
        const problem = await Problem.findOne({ name: problem_id });
        if (problem === null) {
          const problem = new Problem({
            name: problem_id,
            tags: tags,
            link: problem_link,
            site: "CODECHEF",
            editorial_link: problem_editorial,
            tags_added_on: new Date(
              date_added[2],
              date_added[1],
              date_added[0]
            ),
            problem_name: problemName,
            problem_statement: statement,
            input: input,
            output:output,
            explanation:explation,
            editorial_added_on: new Date(
              date_added[2],
              date_added[1],
              date_added[0]
            ),
            solved_submissions: 0,
            total_submission: 0,
            user_ids: "",
            custom_user_ids: "",
            difficulty: difficulty,
          });
          await problem.save();
          const prob = await Problem.findOne({ name: problem_id });
          const tag = new Tags({ problem_id: prob._id, value: tags });
          await tag.save();
          const problem_setter = new ProblemSetter({
            problem_id: prob._id,
            handle: author,
          });
          await problem_setter.save();

          const problemDifficulty = new ProblemDifficulty({
            user_id: user.user_id,
            problem_id: prob._id,
            score: difficulty,
          });
          await problemDifficulty.save();
        } 
          
        
        const parentUser = await User.findOne({ _id: user.user_id });
        const problem_ = await Problem.findOne({ name: problem_id });
        const f_sub = await Submission.findOne({ submission_id: sub_id[2] });
        if (f_sub !== null) {
          final_break = 1;
          break;
        } else {
          var submission = new Submission({
            user_id: user.user_id,
            stopstalk_handle: parentUser.StopStalkHandle,
            submission_id: sub_id[2],
            site_handle: user.userHandle,
            site: "CODECHEF",
            time_stamp: updt_sub_time,
            problem_id: problem_._id,
            problem_name: problem_id,
            problem_link: problem_link,
            lang: lang,
            view_link: `https://www.codechef.com/viewsolution/${sub_id[2]}`,
            points: points,
            status: status,
          });
          await submission.save();

          await Problem.findOneAndUpdate(
            { name: problem_id },
            { $inc: { total_submissions: 1 } }
          );
          if (status === "accepted")
            await Problem.findOneAndUpdate(
              { name: problem_id },
              { $inc: { solved_submissions: 1 } }
            );
        }
      }
      if (final_break == 1) break;
    }
  } catch (err) {
    if (err) throw err;
  }
  console.log("Crawling Completed!!!!!!!!!");
};

cron.schedule("*/3 * * * *",codechefSubmissionScrapper)
