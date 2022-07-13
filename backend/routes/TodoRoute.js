const express=require('express')

const todoRouter=express.Router()

const TodoController = require('../controllers/TodoController')


todoRouter.get('/getTodo/:user_id',TodoController.getUserTodoList)

todoRouter.post('/addproblem', TodoController.addProblem)

todoRouter.get('/allproblems', TodoController.getAllProblems)

todoRouter.get('/alltodolist',TodoController.getTodoList)

todoRouter.post('/addTodo',TodoController.addTodo)

todoRouter.delete('/deleteTodo/:user_id/:problem_id',TodoController.deleteTodo)

todoRouter.delete('/deleteprob/:id',TodoController.deleteProblem)

module.exports = todoRouter