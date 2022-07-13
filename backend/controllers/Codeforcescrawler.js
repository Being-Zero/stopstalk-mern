const cron = require("node-cron");
const express = require("express");
const cors = require("cors");

const dbconnect = require("../db/connect");

const Problem = require("../models/Problem");
const Submission = require("../models/Submission");

const Tag = require("../models/Tag");
const axios = require("axios");
const request = require("request");
const cheerio = require("cheerio");
const SocialHandle = require("../models/SocialHandle");
const ProblemDifficulty = require("../models/ProblemDifficulty");

bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(cors());

var uname;
const date = new Date();
let i = 0;
const fun = async () => {
  SocialHandle.findOne({ siteName: "CodeForces" })
    .sort({ lastRetrieved: 1 })
    .limit(1)
    .then(async (a) => {
      if (a) {
        console.log(a.userHandle);
        a.lastRetrieved = new Date();
        a.save();

        const url =
          `https://codeforces.com/api/user.status?handle=` +
          a.userHandle +
          "&from=1";
        const res = await axios.get(url);
        let data;
        if (res.data["status"] == "OK") {
          let data = res.data.result;
          for (let val = 0; val < data.length; val++) {
            let obj = data[val];
            if (obj) {
              var date = new Date(null);
              date.setSeconds(obj["creationTimeSeconds"]);

              let problemname = obj["problem"]["name"];
              let tags = obj["problem"]["tags"];
              let rating = obj["problem"]["rating"];
              let status = "",
                verdict;
              let problemlink;
              let cid = obj["contestId"];
              let subid = obj["id"];
              let arg = "problem";

              if (cid) {
                if (parseInt(cid) > 900000) {
                  arg = "gymproblem/";
                } else {
                  arg = "problem";
                }
              }
              problemlink =
                "http://www.codeforces.com/problemset/" +
                arg +
                "/" +
                obj["contestId"] +
                "/" +
                obj["problem"]["index"];

              let points = "";
              verdict = obj["verdict"];
              if (verdict == "OK") {
                status = "AC";
              } else if (verdict == "WRONG_ANSWER") {
                status = "WA";
              } else if (verdict == "COMPILATION_ERROR") {
                status = "CE";
              } else if (verdict == "SKIPPED") {
                status = "SK";
              } else if (verdict == "TIME_LIMIT_EXCEEDED") {
                status = "TLE";
              } else if (verdict == "CHALLENGED") {
                status = "HCK";
              } else if (verdict == "RUNTIME_ERROR") {
                status = "RE";
              } else if (verdict == "MEMORY_LIMIT_EXCEEDED") {
                status = "MLE";
              }

              let programminglanguage = obj["programmingLanguage"];
              let viewlink =
                "http://www.codeforces.com/contest/" +
                obj["contestId"] +
                "/submission/" +
                obj["id"];
              if (status == "AC") {
                points = "100";
              } else if (status == "HCK") {
                points = "-50";
              } else {
                points = "0";
              }

              request(
                "https://codeforces.com/contest/" + obj["contestId"] + "",
                async (error, response, html) => {
                  if (!error && response.statusCode == 200) {
                    const $ = cheerio.load(html);
                    const data = $("#sidebar");
                    const temp = [];
                    $("li span  a ").each((i, el) => {
                      temp.push($(el).attr("href"));
                    });
                    var te = "";
                    if (temp[1] != null) {
                      if (temp[1].includes("codeforces")) {
                        te = temp[1];
                      } else {
                        te = "https://codeforces.com" + temp[1];
                      }
                    }

                    const chpb = await Problem.findOne({ name: problemname });

                    if (chpb == null) {
                      let ts = "";
                      for (let v = 0; v < tags.length; v++) {
                        ts += tags[v] + ",";
                      }
                      const pd = new Problem({
                        name: problemname,
                        link: problemlink,
                        tags: ts,
                        site: "CODEFORCES",
                        difficulty: rating,
                        total_submissions: 1,
                        solved_submissions: 1,
                        editorial_link: te,
                      });

                      await pd.save();
                      const problemdiff = new ProblemDifficulty({
                        user_id: a.user_id,
                        problem_id: pd._id,
                        score: rating,
                      });
                      await problemdiff.save();

                      const cht = await Tag.findOne({ problem_id: pd._id });
                      if (cht == null) {
                        const t = new Tag({
                          problem_id: pd._id,
                          value: ts,
                        });

                        await t.save();
                      }
                    }

                    const subpid = await Problem.findOne({ name: problemname });

                    const chkp = await Submission.findOne({
                      submission_id: subid,
                    });
                    if (chkp == null) {
                      const su = new Submission({
                        site_handle: a.userHandle,
                        time_stamp: date,
                        problem_name: problemname,
                        site: "CODEFORCES",
                        problem_id: subpid._id,
                        tags: tags,
                        status: status,
                        points: points,
                        lang: programminglanguage,
                        problem_link: problemlink,
                        view_link: viewlink,
                        user_id: a.user_id,
                        submission_id: subid,
                      });

                      su.save();
                    }

                    //console.log(res)

                    //console.log(pb1["name"])

                    //console.log(api)
                  }
                }
              );

              //console.log(count)
            }
          }
        } else {
          console.log("invalid username");
          return;
        }
      }
    });
};

// cron.schedule('* * * * *',fun)
