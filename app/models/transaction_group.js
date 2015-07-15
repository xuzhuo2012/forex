var mongoose = require('mongoose');
var TransactionGroupSchema = require('../schemas/transaction_group');
var TransactionGroup = mongoose.model('TransactionGroup', TransactionGroupSchema, 'transaction_group');
var ObjectId = mongoose.Schema.Types.ObjectId;

TransactionGroup.prototype.calculate = function() {
    console.log('calculate was found');
    this.analysis.trend = [
        {
            id : ObjectId('55a691fd4006967898b70beb'),
            accumulate : 123
        }
    ];
};


module.exports = TransactionGroup;