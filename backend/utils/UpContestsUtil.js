const axios = require('axios').default

let cusort = (obj1,obj2)=>{
  if(obj1.start_time<obj2.start_time)return -1
  if(obj2.start_time>obj2.start_time)return 1
  return 0
}
let get_Upcoming_contests = async() => {

    let req_pltforms = ["CodeChef", "CodeForces", "AtCoder", "HackerEarth", "HackerRank", "LeetCode"]
    let req_upcomming_contests = []
    let all_contests_data = await (await axios.get('https://kontests.net/api/v1/all')).data
    all_contests_data = all_contests_data.sort(cusort)
    for (let i = 0; i < all_contests_data.length; i++) {
        if (req_pltforms.includes(all_contests_data[i].site)) req_upcomming_contests.push(all_contests_data[i]);
    }
    return conv_date_time(req_upcomming_contests)
}

let conv_date_time = (contests)=>{
  for (let i = 0; i < contests.length; i++) {
      contests[i].ostart_time = contests[i].start_time 
      let date = contests[i].start_time;
      const d = new Date(date)
      let [de,tm]=d.toISOString().split('T')
      tm = d.toString().split(" ")[4];
      contests[i].start_time = de+" "+tm
    }
    
    return contests
}

module.exports ={get_Upcoming_contests}