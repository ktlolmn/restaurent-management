const mongoose = require('mongoose');
const Product = require('./Product')
const Schema = mongoose.Schema;
const HistoryOrder = new Schema(
    {
        name:{
            type: String,
            required: true
        },
        order: [{
            type: String, 
            required: true,
        }],
        bill: {
            type : String,
            default: ""
        },
        idUser:{
            type: Schema.Types.ObjectId,
            ref : 'User'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('HistoryOrder', HistoryOrder);
 