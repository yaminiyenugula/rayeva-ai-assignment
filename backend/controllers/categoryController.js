const { callOpenAI } = require('../services/aiService');
const Product = require('../models/Product');
const getCategoryPrompt = require('../prompts/categoryPrompt');

// POST /api/generate-category
const generateCategory = async (req, res) => {
  try {
    const { product_name, description } = req.body;

    // Validation
    if (!product_name || !description) {
      return res.status(400).json({
        success: false,
        message: 'Product name and description are required',
      });
    }

    // Generate prompt
    const prompt = getCategoryPrompt(product_name, description);

    // Call OpenAI API
    const aiResponse = await callOpenAI(prompt, 'category_generator');

    // Validate AI response structure
    if (
      !aiResponse.primary_category ||
      !aiResponse.sub_category ||
      !Array.isArray(aiResponse.seo_tags) ||
      !Array.isArray(aiResponse.sustainability_filters)
    ) {
      return res.status(400).json({
        success: false,
        message: 'Invalid AI response structure',
      });
    }

    // Save to database
    await Product.create({
      product_name,
      description,
      primary_category: aiResponse.primary_category,
      sub_category: aiResponse.sub_category,
      seo_tags: aiResponse.seo_tags,
      sustainability_filters: aiResponse.sustainability_filters,
    });

    res.status(200).json({
      success: true,
      message: 'Category generated successfully',
      data: {
        primary_category: aiResponse.primary_category,
        sub_category: aiResponse.sub_category,
        seo_tags: aiResponse.seo_tags,
        sustainability_filters: aiResponse.sustainability_filters,
      },
    });
  } catch (error) {
    console.error('Error in generateCategory:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate category',
    });
  }
};

// GET /api/categories - Get all products
const getCategories = async (req, res) => {
  try {
    const products = await Product.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error('Error in getCategories:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories',
    });
  }
};

module.exports = {
  generateCategory,
  getCategories,
};
