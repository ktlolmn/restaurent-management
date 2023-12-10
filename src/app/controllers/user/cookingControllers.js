const Product = require('../../models/Product')
const Table = require('../../models/Table')
const HistoryOrder = require('../../models/historyOrder')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId; // Import ObjectId từ mongoose
const { mutipleMongooseToObject,mongooseToObject } = require('../../../util/mongoose');
const FoodOrdered = require('../../models/foodOrdered');

class CookingController {
    async index(req, res, next) {
        try {
            const foods = await FoodOrdered.find({}).populate('table');
            res.render('user/cooks',{
                foods: mutipleMongooseToObject(foods),
                layout: 'main-user.hbs',
            });
        } catch (err) {
            next(err);
        }
    }
    async changeStatusCooked(req, res, next) {
        try {
            await FoodOrdered.findOneAndUpdate({_id: req.body.foodIdCooking},{
                status: false
            })
            res.redirect('back')
        } catch (err) {
            next(err);
        }
    }
    async changeStatusCooking(req, res, next) {
        try {
            await FoodOrdered.findOneAndUpdate({_id: req.body.foodIdCooked},{
                status: true
            })
            res.redirect('back')
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new CookingController;
