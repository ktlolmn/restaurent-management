const Product = require('../../models/Product')
const Table = require('../../models/Table')
const HistoryOrder = require('../../models/historyOrder')
const FoodOrdered = require('../../models/foodOrdered')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId; // Import ObjectId từ mongoose
const {mutipleMongooseToObject} = require('../../../util/mongoose')

class HomeController{
  index(req, res, next) {
    HistoryOrder.find()
    .then((histories)=>{
      res.render('admin/homeAdmin',{
        histories: JSON.stringify(histories)
      })
    })
    .catch(err => next(err))
  }
}


module.exports = new HomeController;
