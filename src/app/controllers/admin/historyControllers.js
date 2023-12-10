const History = require('../../models/historyOrder');
const User = require('../../models/User');
const {mutipleMongooseToObject} = require('../../../util/mongoose')


class historyControllers{
    async index(req,res,next){
        try{
            History.find().populate('idUser')
            .then((history)=>{
                res.render('admin/history',{
                    history: mutipleMongooseToObject(history),
                })
            })
            .catch(err=>next(err))

        }catch(err){
            next(err)
        }
    }
}
module.exports = new historyControllers