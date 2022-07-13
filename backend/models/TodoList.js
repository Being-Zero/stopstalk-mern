const mongoose =require("mongoose");

const TodoListSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.ObjectId, ref: "User" },
    problem_id: { type: mongoose.Schema.ObjectId, ref: "Problem" }, 
});

const TodoList = mongoose.model('TodoList', TodoListSchema);

module.exports = TodoList;