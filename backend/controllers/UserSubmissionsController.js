let User = require('../models/User')
let SocialHandle = require('./../models/SocialHandle')
let Submission = require('../models/Submission')
// const hack = require('../Crawlers/Hackerrrank/hackerrank')
const hack = require('../Crawlers/Hackerrrank/hackv2')




exports.hackerrankCrawler = async (req,res)=>{
    try{
        let social_handle = await SocialHandle.findOne({user_id:req.user._id,siteName:"HackerRank"}) 
        let h = new hack.Hackerrank(social_handle,req.user.StopStalkHandle)
        if(h.isvalid()){
            res.send("Your submissions will be updated in 5 min")
            h.get_submissions()
        }
        else res.send("Please Update Your Handles Correctly");
    }catch{
        console.error('error while crawling user submissions')
    }
}

exports.get_user_submissions = async(req,res)=>{
    let usubs = await Submission.find({user_id:req.user._id}).sort({time_stamp:-1})
    console.log(req.user._id)
    res.send(usubs)
}
