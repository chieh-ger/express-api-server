const Schema = require('mongoose').Schema;

const User = new Schema({
    username: String,
    accountId: String,
    balance: Number,
    ccBalance: Number,
    ccTotal: Number,
    debitOrders: Array,
    idNumber: String
}, { collection : 'userAccounts' });

const Chat = new Schema({
    username: String,
    accountId: String,
    chatStatus: String,
    chatHistory: Array,
    queryFlags: Array,
    date: String
}, { collection : 'chatHistory' });

module.exports = {
    User,
    Chat
}