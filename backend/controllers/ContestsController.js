const contests = require('../utils/UpContestsUtil')

exports.upcommingcontests = async (req,res) =>{
    const cleaned_data = await contests.get_Upcoming_contests()
    res.send(await cleaned_data)
}