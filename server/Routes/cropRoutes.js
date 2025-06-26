const express = require('express');
const router = express.Router();
const cropsControl = require('./../controllers/cropsControllers');
const authMiddleware = require('./../middlewares/authMiddleware');

router.route('/create')
  .post(authMiddleware, cropsControl.createCrop);

router.route('/get-all-crops')
  .get(authMiddleware, cropsControl.getAllCrops);

router.route('/farmcrops/:farmId')
  .get(authMiddleware, cropsControl.getCropsByFarm);

router.route('/get-crops-farmers')
  .get(authMiddleware, cropsControl.getCropsForFarmer);

router.route('/mycrops/:id')
  .get(authMiddleware, cropsControl.getCropById);

module.exports = router;
