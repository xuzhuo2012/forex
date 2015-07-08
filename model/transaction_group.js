var mongoose = require('mongoose');
var TransactionGroupSchema = require('../schemas/transaction_group');
var TransactionGroup = mongoose.model('TransactionGroup', TransactionGroupSchema);

module.exports = TransactionGroup;