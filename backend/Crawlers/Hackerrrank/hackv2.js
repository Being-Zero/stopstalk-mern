
const  Problem  = require('../../models/Problem')
let Submission = require('../../models/Submission')
const ProblemSetter = require('../../models/ProblemSetter')
const ProblemDifficulty = require('../../models/ProblemDifficulty')
const Tag = require("../../models/Tag")
const axios = require('axios').default

class Hackerrank{

    constructor(user,stopstalk_handle){
        this.user = user
        this.stp_stalk = stopstalk_handle
        user.lastRetrieved = new Date()
        user.save()
    }

    async get_req(url){
        const headers = {
            'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36",
            'cookie' : 'hackerrank_mixpanel_token=c039010d-8e12-46c8-b4ba-321d269bf7fb; hrc_l_i=F'
        };
        try{
            let fromcookie = await (await axios.get(url,{headers})).data
            // console.log(fromcookie);
            return fromcookie
        }catch(e){
            
            return {}
        }

    }

    async isvalid(){
        let url = "https://www.hackerrank.com/rest/hackers/" +this.user.userHandle+"/recent_challenges?offset=0&limit=2";
        const headers = {
            'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36",
            'cookie' : 'hackerrank_mixpanel_token=c039010d-8e12-46c8-b4ba-321d269bf7fb; hrc_l_i=F'
        };
        try{
            // console.log(url);
            const status = await (await axios.get(url,{headers:headers})).status
            // console.log(status);
            return status == 200
 
        }catch(err){
            return false;
        }
    }

    async get_tags(res){
        // console.log("in get tags");
        let all_tags = []
        let model = res.model
        let track = model.track
        let primary_contest = model.primary_contest
        
        if(track)all_tags = [track.name]
        else if(primary_contest){
            if(primary_contest.track)all_tags = [primary_contest["track"]["name"]]
            else if(primary_contest["name"])all_tags = [primary_contest["name"]]
        }
        // else{
        //     return 
        // }
        // console.log("leaving get tags")
        return all_tags.join()

    }

     async get_editorial_link(jsonres,problem_link){
        // console.log("in get editorial link")
         let is_edit_avail = Boolean(jsonres.model.is_editorial_available)
        // console.log(is_edit_avail);
        let editorial_link = is_edit_avail?problem_link+"/editorial/":null
        // console.log("leaving get editorial link")
        return editorial_link
    }

    async get_problem_setters(res){
        // console.log("in setters");
        let author = res.model.author_name
        // console.log(typeof(author));
        return author
    }

    async get_problem_details(problem_link,uid){
        try{   
            // console.log("trigerrd");
            let pUrl = problem_link
            let restUrl = null
            if(problem_link.includes("contests"))restUrl = problem_link.replace("contests","rest/contests/")
            else{
                restUrl = problem_link.replace("challenges","rest/contests/master/challenges")
            }
            // console.log(restUrl)
            let jsonres =   await this.get_req(restUrl)
            let problemDetails = {
                    "name": jsonres.model.name,
                    "tags": await this.get_tags(jsonres) || "no tags",
                    "link": problem_link,
                    "site":"HackerRank",
                    "tags_added_on":jsonres.model.created_at,
                    "editorial_added_on":jsonres.model.updated_at,     
                    "editorial_link": await this.get_editorial_link(jsonres,pUrl),
                    // "user_ids":[uid],
                    "difficulty":jsonres.model.difficulty,
                    "solved_submissions":1,
                    "total_submissions":1
                }
            return [problemDetails,jsonres]
        }catch(e){
      
            console.log("logged error in problem details");
        }

    }

    async get_submissions(){
        let user = this.user
        let stp_stalk = this.stp_stalk
        try{  
            let cur = null
            let url = `https://www.hackerrank.com/rest/hackers/${user.userHandle}/recent_challenges?limit=15&cursor=null&response_version=v2`
            let site = "https://www.hackerrank.com"

            for(let j=0;j<1000;j++){
                let jsonout = await this.get_req(url.replace('null',cur))
                // if(jsonout[0].created_at == Submission.find({user_id:user.user_id,site:"HackerRank"}).sort({time_stamp:-1}).limit(1))break;
                for (let i = 0; i < jsonout.models.length; i++) {
                    // console.log(jsonout.models[i].url)
                    let prob,jsonres
                    let data = await Problem.findOne({ $and: [{ link: site + jsonout.models[i].url }, {site:"HackerRank"} ] })
                    if (data == null){
                        // console.log("in if");
                        [prob,jsonres] = await this.get_problem_details(site+jsonout.models[i].url,user._id)
                        let p = new Problem(prob)
                        p.save()

                        let psetr =  new ProblemSetter({problem_id:p._id,handle:await this.get_problem_setters(jsonres)})
                        psetr.save()

                        let pdiff = new ProblemDifficulty({user_id:user._id,problem_id:p._id,score:prob.difficulty})
                        pdiff.save()
                        
                        let prbtags = await this.get_tags(jsonres)
                        let ptag = new Tag({problem_id:p._id,value: prbtags})
                        ptag.save()
                        // console.log(user.user_id);
                        let users_sub={
                            "user_id":user.user_id,
                            "custom_user_id":null,
                            "submission_id":`${Date.now()}`,
                            "stopstalk_handle":stp_stalk,
                            "site_handle": user.userHandle,
                            "site":"HackerRank",
                            "time_stamp": jsonout.models[i].created_at,
                            "problem_id":p._id,
                            "problem_name":prob.name,
                            "problem_link": site + jsonout.models[i].url,
                            "lang":"-",
                            "status":"ACCEPTED",
                            "points":100,
                            "view_link":null
                        }
                        let u_submission = new Submission(users_sub)
                        u_submission.save()
                    }
                    else{
                        // //Find the problem in db and and get its details
                        // console.log("in else");
                        // console.log(user)
                        let users_sub={
                            "user_id":user.user_id,
                            "custom_user_id":null,
                            "submission_id":`${Date.now()}`,
                            "stopstalk_handle":stp_stalk,
                            "site_handle": user.userHandle,
                            "site":"HackerRank",
                            "time_stamp": jsonout.models[i].created_at,
                            "problem_id":data._id,
                            "problem_name":data.name,
                            "problem_link": site + jsonout.models[i].url,
                            "lang":"-",
                            "status":"Accepted",
                            "points":100,
                            "view_link":null
                        }
                        // let checkuseralready_submitted = await Submission.findOne({user_id:user.user_id})
                        // let checkuseralready_submitted = await Submission.findOne(users_sub)
                        // console.log(checkuseralready_submitted);
                        let checkuseralready_submitted = await Submission.findOne( {$and: [{user_id:user.user_id}, {problem_id:data._id} ]})

                        if(checkuseralready_submitted==null){
                            // console.log("in sec if");
                            data.solved_submissions+=1
                            data.total_submissions+=1
                            data.save()
                            let u_submission = new Submission(users_sub)
                            u_submission.save()
                        }
                    }
                }
                cur = await jsonout.cursor
                if(jsonout.last_page)break
            }

        }
        catch(e){
            console.log(e);
            console.log("logged error in get submission");
        }
    }

}

module.exports = {Hackerrank}





