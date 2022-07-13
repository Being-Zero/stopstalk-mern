const cron = require('node-cron');
const hack = require('../Hackerrrank/hackv2')
const SocialHandle = require('../../models/SocialHandle')
const User = require('../../models/User')



let HackerRank_Handles_Scheduler = async()=>{
    const handle = await SocialHandle.findOne({$and:[{siteName: 'HackerRank'},{lastRetrieved:{$ne:null}}]}).sort({lastRetrieved:1}).limit(1);
    const  usr= await User.findOne({_id:handle.user_id})
    let h = new hack.Hackerrank(handle,usr.StopStalkHandle)
    console.log(handle.userHandle)
    await h.isvalid()?h.get_submissions():console.log("invalid Handle");
}

// let ha = new hack.Hackerrank({userHandle:"S09_190031020"},"")
// ha.isvalid().then(res=>console.log(res))
// cron.schedule('*/1 * * * *', HackerRank_Handles_Scheduler);




