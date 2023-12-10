const express = require('express');
const router = express.Router();

const TableController = require('../../app/controllers/user/tableControllers')

router.post('/clear-table', TableController.clearTable);
router.get('/', TableController.index);
module.exports = router
