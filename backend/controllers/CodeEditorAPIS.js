const axios = require("axios");
const Problem = require("../models/Problem");


const getProblem = async (req, res) => {
  try {
    const body = req.body;

    if (!body) {
      return res.status(404).json({
        success: "false",
        message: "Something Went Wrong",
      });
    }

    const problem = await Problem.findOne({ name: req.params.id });

    if (!problem) {
      return res.status(404).json({
        success: "False",
        message: "Problem Not available",
      });
    }

    return res.status(200).json({
      success: "true",
      message: "Problem Available",
      data: problem,
    });
  } catch (err) {
    if (err) {
      return res.status(404).json({
        success: "false",
        message: "Error Occured",
      });
    }
  }
};

module.exports = {getProblem };
