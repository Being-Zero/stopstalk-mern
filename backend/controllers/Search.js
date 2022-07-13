const axios = require("axios");
const Problem = require("../models/Problem")

const ProblemSet = async (req, res) => {
  const body = req.body;
  const page = parseInt(body.page);
  const limit = parseInt(body.limit);
  const skipIndex = (page - 1) * limit;
  if (!body) {
    return res.status(404).json({
      success: false,
      message: "Something Went Wrong",
    });
  }

  var d = body.tags;
  
  const items = await Problem.find({
      $and: [
        { tags: { $regex: d ,$options: "$i"} },
        { name: { $regex: body.name, $options: "$i" }},
        {site: {$regex: body.site , $options: "$i"}}
      ],
    }).limit(limit)
    .skip(skipIndex)

  if (items.length > 0) {
    return res.status(200).json({
      success: true,
      message: "Successfully Retrieved",
      data: items,
    });
  } else {
    return res.status(404).json({
      success: false,
      message: "No Related Documents Available",
      data: items,
    });
  }
};

module.exports = { ProblemSet };
