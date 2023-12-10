const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodOrdered = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    table: {
      type: Schema.Types.ObjectId,
      ref: 'Table', // Reference to the Table model
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('FoodOrdered', FoodOrdered);
