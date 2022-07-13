const express = require("express");
const app = express();
const dbconnect = require("./backend/db/connect");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
// const morgan = require("morgan");
const path = require("path");
const env_config = require("./backend/config/config");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const userRouter = require("./backend/routes/UserRoutes");

const todoroute = require("./backend/routes/TodoRoute");

const leaderboardRouter = require("./backend/routes/LeaderboardRoute");

const problemRouter = require("./backend/routes/ProblemRouter");
const appRouter = require("./backend/routes/AppRoutes");

const UserSubmissionRouter = require("./backend/routes/UserSubmissionRouter");
// completed
const graphRouter = require("./backend/routes/GraphRoutes");
const contestRouter = require("./backend/routes/ContestRoutes");

const contactrouter = require("./backend/routes/ContactUsRoute");

const subscriptionrouter = require("./backend/routes/UnSubscribeRoute");

const port = env_config.get_active_config().web_port;

const scheduler = require("./backend/Crawlers/Scheduler/Schedule");
const codeEditorRoutes = require("./backend/routes/CodeEditorRoutes");
dbconnect.connect(true);

// some comment
// app.use(morgan("dev"));

app.use(bodyParser.json());

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded());
app.use(express.static(__dirname + "/frontend/build"));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/contests", contestRouter);
app.use("/api/v1/graph-data", graphRouter);
app.use("/api/v1/leaderboard", leaderboardRouter);
app.use("/api/v1/problem", problemRouter);
app.use("/todo", todoroute);
app.use("/app", appRouter);
app.use("/api/v1/todo", todoroute);
app.use("/api/v1/contact", contactrouter);
app.use("/api/v1/subscription", subscriptionrouter);
app.use("/api/v1", codeEditorRoutes);
// app.use("/api/v1/contests",contestRouter);
// app.use("/todo",todoroute);
app.use("/api/v1/crawlers", UserSubmissionRouter);
// app.get("/*", function (req, res) {
//   res.send("Welcome to Express");
// });
app.get("/*", async (req, res) => {
  res.sendFile(process.cwd() + "/frontend/build/index.html");
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
