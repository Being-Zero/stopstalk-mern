const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema({
    name: { type: String },
    tags: { type: String, required: [true, "tags are required"] },
    link: { type: String },
    site: { type: String },
    editorial_link: { type: String, default: '' },
    tags_added_on: { type: Date },
    problem_name: {type:String , default:''},
    problem_statement: {type:String , default:''},
    input:{type:[String],default:[]},
    output:{type:[String] ,default:[]},
    explanation:{type:String,default:''},
    editorial_added_on: { type: Date },
    solved_submissions: { type: Number, default: 0 },
    total_submissions: { type: Number, default: 0 },
    user_ids: { type: String, default: '' },
    custom_user_ids: { type: String, default: '' },
    difficulty: { type: Number },
}, {
    toJSON: { virtuals: true },
    toObject: {virtuals: true}
});

ProblemSchema.virtual('user_count').get(function () {
    try {
        let ul = this.user_ids.split(", ")
        return ul.length;

    }catch(e) {
        return 0;
    }

})
ProblemSchema.virtual('custom_user_count').get(function () {
    try {
        let ul = this.custom_user_ids.split(", ")
        return ul.length;

    }catch(e) {
        return 0;
    }

})




const Problem = mongoose.model('Problem', ProblemSchema);

module.exports = Problem
