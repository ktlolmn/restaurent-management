const Product = require('../../models/Product')
const Table = require('../../models/Table')
const HistoryOrder = require('../../models/historyOrder')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId; // Import ObjectId từ mongoose
const { mutipleMongooseToObject,mongooseToObject } = require('../../../util/mongoose');
const FoodOrdered = require('../../models/foodOrdered');

class TableController {
    async index(req, res, next) {
        try {
            const tables = await Table.find({}).populate('order');
            const foods = await FoodOrdered.find({})
            res.render('admin/managerTable', {
                tables: mutipleMongooseToObject(tables),
                foods: JSON.stringify(foods)
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new TableController;
