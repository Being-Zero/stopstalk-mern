const express= require('express')

const ContactUsController = require('../controllers/ContactUsController')

const ContactUsRouter = express.Router()

ContactUsRouter.get('/getallFeedbacks', ContactUsController.getAllContactDetails);

ContactUsRouter.post('/addFeedback', ContactUsController.addContactDetails);

ContactUsRouter.delete('/deleteFeedback', ContactUsController.deleteContactDetails);

module.exports = ContactUsRouter