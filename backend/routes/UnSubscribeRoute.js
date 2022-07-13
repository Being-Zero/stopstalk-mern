const express = require('express')

const unsubscribeController = require('../controllers/UnSubscribeController')

const unSubscribeRouter = express.Router()

unSubscribeRouter.get('/getSubscription/:email', unsubscribeController.getSubscription);

unSubscribeRouter.post('/addSubscription', unsubscribeController.addSubscription);

unSubscribeRouter.put('/updateSubscription/:email',unsubscribeController.UpdateSubscription);

unSubscribeRouter.delete('/deleteSubscription/:email',unsubscribeController.deletesub);

module.exports = unSubscribeRouter