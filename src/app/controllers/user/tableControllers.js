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
            res.render('user/tables', {
                tables: mutipleMongooseToObject(tables),
                layout: 'main-user.hbs',
                foods: JSON.stringify(foods)
            });
        } catch (err) {
            next(err);
        }
    }

    async clearTable(req,res, next){
        try{
            await Table.findByIdAndUpdate({_id : req.body.tableId},{
                status : false,
                order : [],
                bill : ""
            })
            await FoodOrdered.deleteMany({ table: req.body.tableId });
            res.redirect('back')
        }
        catch(err){
            next(err)
        }
    }
}

module.exports = new TableController;
