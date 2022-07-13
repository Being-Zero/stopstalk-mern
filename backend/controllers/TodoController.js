const express=require('express')

const problemModel=require('../models/Problem.js')
const todoModel=require('../models/TodoList.js')


exports.getUserTodoList = async (req,res) => {
    try
    {
        todoModel.find({"user_id":req.params.user_id})
        .then((data) => {
            const n=data.length;
            if(n==0)
            {
                // res.statusCode = 500;
                res.json([])
            }
            else
            {
                var obj = []
                var m=0;
                for(let i=0;i<n;i++)
                {
                    problemModel.findOne({'_id':data[i].problem_id}, function(err,response)  {
                        if(err)
                        {
                            res.statusCode = 500;
                            res.json({"Error":err})
                        }
                        else
                        {
                            const abc = {
                                "problem_id":data[i].problem_id,
                                "site":response.site,
                                "problem": response.name,
                                "solved_submissions":response.solved_submissions,
                                "total_submissions":response.total_submissions
                            }
                            obj[m]=abc;
                            m+=1;
                        }
                    }) 

                }
                setTimeout(() => {
                    res.statusCode = 200;
                    res.setHeader('content-type', 'text/json')
                    res.send(obj);
                }, 1000);
            }
        })
        .catch((err) => {
            console.log(err)
            res.statusCode = 500;
            res.json({'Error':err})
        })
    }
    catch(err)
    {
        
        res.statusCode = 500;
        res.json({'Error': err})
    }
}

exports.addProblem = async(req,res) => {

    const prob=req.body
    problemModel.findOne({'link':req.body.link})
    .then((data) => {
        if(data !=null )
        {
            res.statusCode = 500;
            res.json({"Error":"Problem has been added before"})
        }
        else
        {
            problemModel.create(prob)
            .then((resp) => {
                res.statusCode = 200;
                res.json({"success":"Problem has been added successfully"})
            })
            .catch((err) => {
                res.statusCode = 500;
                res.json({"Error":"error while creating"})
            })
        }
    })
    .catch((err1) => {
        res.statusCode = 500;
        res.json({"Error":"error in finding"})
    })
}

exports.getAllProblems = (req,res) => {
    try
    {
        problemModel.find({})
        .then((resp) => {
            if(resp.length==0)
            {
                res.statusCode = 500;
                res.json({"Error":"No problem was in database"})
            }
            else
            {
                res.statusCode = 200;
                res.json(resp)
            }
        })
        .catch((err) => {
            res.statusCode = 500;
            res.json({"Error":err})
        })
    }
    catch(err)
    {
        res.json({"Error":err})
    }
}

exports.getTodoList = async(req,res) => {
    try
    {
        todoModel.find({})
        .then((resp) => {
            if(resp.length==0)
            {
                res.statusCode = 500;
                res.json({"Error":"No Todo was in database"})
            }
            else
            {
                res.statusCode = 200;
                res.json(resp)
            }
        })
        .catch((err) => {
            res.statusCode = 500;
            res.json({"Error":err})
        })
    }
    catch(err)
    {
        res.json({"Error":err})
    }
}

exports.addTodo = (req,res) => {
    try
    {
        const reqbody=req.body;
        let userid=reqbody['user_id']
        let problem_id=reqbody['problem_id']

        const data = {
            "user_id":userid,
            "problem_id":problem_id
        }

        todoModel.find({'user_id':userid,'problem_id':problem_id})
        .then((result) => {
            if(result.length!=0)
            {
                res.statusCode=500;
                res.json({'Error':"Already added to Database!!"})
            }
            else
            {
                todoModel.create(data) 
                .then((resp) => {
                    res.statusCode = 500;
                    res.setHeader('content-type', 'text/json')
                    res.json({'success': "Data has been added to todolist"})
                })
                .catch((Err) => {
                    res.statusCode=500;
                    res.json({'Error':"Error while create a todo list"})
                })
            }
        })
        .catch((err) => {
            res.statusCode=500;
            res.json({'Error':"Error while finding the data in the database"});
        })

    }
    catch(err) 
    {
        res.json({'Error':err})
    }
}


exports.deleteTodo = async (req,res) => {
    todoModel.deleteOne( { "user_id" : req.params.user_id,"problem_id": req.params.problem_id })
    .then((responce) => {
        res.json({"success":"Successfully Deleted the todo"})
    })
    .catch((err) => {
        res.json({"Error":"Error while deleting Todo"})
    })
}

exports.deleteProblem = async (req,res) => {
    problemModel.deleteOne( { "_id" : req.params.id })
    .then((responce) => {
        res.json({"success":"Successfully Deleted the todo"})
    })
    .catch((err) => {
        res.json({"Error":"Error while deleting Todo"})
    })
}
