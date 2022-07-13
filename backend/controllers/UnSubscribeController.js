const UnSubscibeModel=require('../models/UnSubscriber')

exports.getSubscription = async (req,res,next) => {
    try
    {
        UnSubscibeModel.findOne({"email":req.params.email})
        .then((data) => {
            if(data==null)
            {
                // res.statusCode = 500;
                res.json([])
            }
            else
            {
                res.statusCode = 200;
                res.setHeader('content-type', 'text/json')
                res.send(data);
            }
        })
        .catch((err) => {
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

exports.addSubscription = async(req,res) => {

    try{
        const details=req.body
        UnSubscibeModel.create(details)
        .then((data) => {
            res.statusCode = 200;
            res.json({"success":"Subscription was added successfully"})
        })
        .catch((err) => {
            res.statusCode = 500;
            res.json({"Error":"error while adding subscription"})
        })
    }
    catch(err)
    {
        res.statusCode = 500;
        res.json({"Error":"error while adding"})
    }
}

exports.UpdateSubscription = async (req,res) => {
    try
    {
        const details=req.body;
        UnSubscibeModel.findOneAndUpdate({email: req.params.email}, {
            $set: details
        }, { new: true })
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('content-type', 'text/json')
            res.send(resp);
        })
        .catch((err) => {
            res.statusCode = 500;
            res.json({"Error":"error while updating"})
        })
    }
    catch(err)
    {
        res.statusCode = 500;
        res.json({"Error":"error while updating"})
    }
}

exports.deletesub = async (req,res) => {
    UnSubscibeModel.deleteOne( { "email" : req.params.email})
    .then((responce) => {
        res.json({"success":"Successfully Deleted "})
    })
    .catch((err) => {
        res.json({"Error":"Error while deleting"})
    })
}