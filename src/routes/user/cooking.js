const express = require('express');
const router = express.Router();

const cookingController = require('../../app/controllers/user/cookingControllers')

// router.post('/save-order', cookingController.saveOrder);
router.post('/change-status-cooked', cookingController.changeStatusCooked);
router.post('/change-status-cooking', cookingController.changeStatusCooking);
router.get('/', cookingController.index);

module.exports = router
