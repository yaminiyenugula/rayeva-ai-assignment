const express = require('express');
const {
  generateCategory,
  getCategories,
} = require('../controllers/categoryController');

const router = express.Router();

router.post('/generate-category', generateCategory);
router.get('/categories', getCategories);

module.exports = router;
