const express = require('express');
const router = express.Router();

const managerTableControllers = require('../../app/controllers/admin/managerTableControllers')

router.get('/', managerTableControllers.index);

module.exports = router
