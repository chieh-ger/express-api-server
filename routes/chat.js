const express = require('express');
const mongoose = require('mongoose');
const moment = require('moment');
const config = require('../config');
const mongodb = require('../schemas/mongodb');
const { successResponse, errorResponse } = require('../responses');

let router = express.Router();

const chats = mongoose.model('chatHistory', mongodb.Chat);

router
    .route('/')
    .get((req, res) => {
        try {
            if(req.query.accountId) {
                chats.find({accountId: req.query.accountId}, (err, doc) => {
                    if(err) throw err;
                    if(doc.length > 0) {
                        res.send(successResponse(doc));
                    } else {
                        res.send(successResponse());
                    }
                });
            } else {
                chats.find({}, (err, doc) => {
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
            let newChat = {
                username: req.body.username,
                accountId: req.body.accountId,
                chatStatus: req.body.status,
                chatHistory: req.body.history,
                queryFlags: req.body.flags,
                date: moment().format("YYYY-MM-DD")
            }
            const createResponse = await chats.create(newChat);
            res.send(successResponse(createResponse));
        } catch(error) {
            res.send(errorResponse(error));
        }
    })
    .put(async(req, res) => {
        try {
            let updates = {
                chatHistory: req.body.history,
                chatStatus: req.body.status
            }
            const updateResponse =  await chats.findOneAndUpdate({accountId: req.query.accountId, date?: req.query.date}, updates, {new: true});
            res.send(successResponse(updateResponse));
        } catch(error) {
            res.send(errorResponse(error));
        }
    })

module.exports = router;