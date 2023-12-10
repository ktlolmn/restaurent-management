const express = require('express');
const router = express.Router();

const homeControllers = require('../../app/controllers/user/homeControllers')

router.post('/save-order', homeControllers.saveOrder);
router.get('/', homeControllers.index);

module.exports = router
