const homeRoute = require('./user/home')
const tableRoute = require('./user/table')
const cookRoute = require('./user/cooking')
const loginRoutes = require('./login/login')
const homeAminRoute = require('./admin/home')
const managerTableRoute = require('./admin/manager-table')
const managerMenuRoute = require('./admin/manager-menu')
const historyRoute = require('./admin/history')
const validateMiddleware = require('./../app/middleware/login.middleware')
function route(app){
    app.use('/table-status',validateMiddleware.verifyTokenAndUser,tableRoute)
    app.use('/cooking',validateMiddleware.verifyTokenAndUser, cookRoute)
    app.use('/home',validateMiddleware.verifyTokenAndUser, homeRoute)
    app.use('/admin',validateMiddleware.verifyTokenAndAdmin, homeAminRoute)
    app.use('/manager-table',validateMiddleware.verifyTokenAndAdmin, managerTableRoute)
    app.use('/manager-menu',validateMiddleware.verifyTokenAndAdmin, managerMenuRoute)
    app.use('/history',validateMiddleware.verifyTokenAndAdmin, historyRoute)
    app.use('/',loginRoutes)
}

module.exports = route