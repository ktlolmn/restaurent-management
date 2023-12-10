const express = require('express');
const router = express.Router();

const homeAdminControllers = require('../../app/controllers/admin/homeControllers')

router.get('/', homeAdminControllers.index);

module.exports = router
