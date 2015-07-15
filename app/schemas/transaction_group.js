/**
 * Created by Terry on 2015/6/29.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;


var TransactionGroupSchema = new Schema(
{
    owner : String,
    fileName : String,
    name : String,
    broker : String,
    type : String,
    accountName : String,
    accountNumber : String,
    address : String,
    pl : Number,
    amount : Number,
    thumbnail : String,

    transactions: [
    {
        ticket : String,
        currency: String,
        volume : Number,
        lots : Number,
        openTime : Date,
        closeTime : Date,
        openType : String,
        closeType : String,
        direction : String,
        openPosition : Number,
        closePosition : Number,
        netPL : Number,
        grossPL : Number
    }],

    analysis:{
        trend : [
            {
                id : ObjectId,
                accumulate : Number
            }
        ]
    },

    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

TransactionGroupSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    }
    else {
        this.meta.updateAt = Date.now();
    }

    next();
});

TransactionGroupSchema.pre('save', function(next) {
    console.log('可以重复叠加前置函数...');

    next();
});

TransactionGroupSchema.statics = {
    fetch: function(cb) {
        return this
            .find({})
            .sort('meta.createAt')
            .exec(cb)
    },

    fetchByOwner: function(owner, cb) {
        return this
            .find({owner:owner})
            .sort('meta.createAt')
            .exec(cb)
    },

    findById: function(id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb)
    }
};

module.exports = TransactionGroupSchema;