var mongoose = require('mongoose');
var TransactionGroupSchema = require('../schemas/transaction_group');
var TransactionGroup = mongoose.model('TransactionGroup', TransactionGroupSchema, 'transaction_group');

module.exports = TransactionGroup;