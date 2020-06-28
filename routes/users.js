const express = require('express');
const mongoose = require('mongoose');
const config = require('../config');
const mongodb = require('../schemas/mongodb');
const { successResponse, errorResponse } = require('../responses');

let router = express.Router();

mongoose.connect(`mongodb+srv://${config.mongoUsername}:${config.mongoPass}@${config.mongoURL}/${config.mongoUserDB}`, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.connection.once("open", () => {
    console.log(`mongodb://${config.mongoURL}/${config.mongoUserDB} connection established successfully`);
});

const users = mongoose.model('userAccount', mongodb.User);

router
    .route('/')
    .get((req, res) => {
        try {
            if(req.query.accountId) {
                users.find({accountId: req.query.accountId}, (err, doc) => {
                    if(err) throw err;
                    if(doc.length > 0) {
                        res.send(successResponse(doc));
                    } else {
                        res.send(successResponse());
                    }
                });
            } else {
                users.find({}, (err, doc) => {
                    if(err) throw err;
                    if(doc.length > 0) {
                        res.send(successResponse(doc));
                    } else {
                        res.send(successResponse());
                    }
                });
            }
        } catch(error) {
            res.send(errorResponse(error));
        }
    })
    .post(async(req, res) => {
        try {
            let newUser = {
                username: req.body.username,
                accountId: `bank-${req.body.username.toLowerCase()}-${Math.floor(Math.random() * 1000)}`,
                balance: req.body.balance,
                ccBalance: req.body.ccAmount,
                ccTotal: req.body.ccAmount,
                debitOrders: req.body.debitOrders,
                idNumber: req.body.idNumber
            }
            const createResponse = await users.create(newUser);
            res.send(successResponse(createResponse));
        } catch(error) {
            res.send(errorResponse(error));
        }
    })
    .put(async(req, res) => {
        try {
            const updateResponse =  await users.findOneAndUpdate({accountId: req.query.accountId}, req.body, {new: true});
            res.send(successResponse(updateResponse));
        } catch(error) {
            res.send(errorResponse(error));
        }
    });
    
module.exports = router;