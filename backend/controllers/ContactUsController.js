const ContactUsModel = require('../models/ContactUs')

exports.getAllContactDetails = async (req,res,next) => {
    try
    {
        ContactUsModel.find({})
        .then((data) => {
            const n=data.length;
            if(n==0)
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

exports.addContactDetails = async(req,res) => {

    try{
        const details=req.body
        ContactUsModel.create(details)
        .then((data) => {
            res.statusCode = 200;
            res.json({"success":"Contact Detauls has been Saved successfully"})
        })
        .catch((err) => {
            res.statusCode = 500;
            res.json({"Error":"error while creating"})
        })
    }
    catch(err)
    {
        res.statusCode = 500;
        res.json({"Error":"error while creating"})
    }
}

exports.deleteContactDetails = async (req,res) => {
    ContactUsModel.deleteOne( { "email" : req.params.email})
    .then((responce) => {
        res.json({"success":"Successfully Deleted "})
    })
    .catch((err) => {
        res.json({"Error":"Error while deleting"})
    })
}