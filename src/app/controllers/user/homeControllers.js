
const Product = require('../../models/Product')
const Table = require('../../models/Table')
const HistoryOrder = require('../../models/historyOrder')
const FoodOrdered = require('../../models/foodOrdered')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId; // Import ObjectId từ mongoose
const {mutipleMongooseToObject} = require('../../../util/mongoose')

class HomeController{
  index(req, res, next) {
    Product.find({})
      .then(products => {
        Table.find({ status: false }) // Find tables with status false
          .then(tables => {
            res.render('user/home',{ // Sửa lỗi ở đây
              products: mutipleMongooseToObject(products),
              layout: 'main-user.hbs',
              tables: mutipleMongooseToObject(tables)
            });
          })
          .catch(error => next(error)); // Sửa lỗi ở đây
      })
      .catch(error => next(error)); // Sửa lỗi ở đây
  }
  
    
  saveOrder(req, res, next) {
    const tableName = req.body.tableId;
    const foodIdsString = req.body.foodIds;
    const total = req.body.total;
    const idUser = req.user.id;
    const foodIdsArray = JSON.parse(foodIdsString).map(id => new ObjectId(id));
    var nameFoods = [];
  
    Table.findByIdAndUpdate(
      { _id: tableName },
      {
        status: true,
        order: foodIdsArray,
        bill: total,
      },
      { upsert: true }
    )
      .then(async table => {
        const productPromises = foodIdsArray.map(element =>
          Product.findById({ _id: element })
            .then(product => {
              return product.name;
            })
            .catch(err => next(err))
        );
  
        nameFoods = await Promise.all(productPromises);

        const newHistoryOrder = new HistoryOrder({
          name: table.name,
          order: nameFoods,
          bill: total,
          idUser: idUser,
        });
  
        await newHistoryOrder.save();
  
        const foodOrderedPromises = foodIdsArray.map(async foodId => {
          const product = await Product.findById(foodId);
          return FoodOrdered.create({
            name: product.name,
            price: product.price,
            code: product.code,
            status: true,
            table: table._id,
          });
        });
  
        await Promise.all(foodOrderedPromises);
  
        res.redirect('back');
      })
      .catch(next);
  }
  
  }


module.exports = new HomeController;
