const { callOpenAI } = require('../services/aiService');
const Proposal = require('../models/Proposal');
const getProposalPrompt = require('../prompts/proposalPrompt');

// POST /api/generate-proposal
const generateProposal = async (req, res) => {
  try {
    const { business_type, budget, event } = req.body;

    // Validation
    if (!business_type || !budget || !event) {
      return res.status(400).json({
        success: false,
        message: 'Business type, budget, and event are required',
      });
    }

    if (typeof budget !== 'number' || budget <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Budget must be a positive number',
      });
    }

    // Generate prompt
    const prompt = getProposalPrompt(business_type, budget, event);

    // Call OpenAI API
    const aiResponse = await callOpenAI(prompt, 'proposal_generator');

    // Validate AI response structure
    if (
      !Array.isArray(aiResponse.recommended_products) ||
      typeof aiResponse.budget_allocation !== 'object' ||
      typeof aiResponse.estimated_cost !== 'number' ||
      !aiResponse.impact_summary
    ) {
      return res.status(400).json({
        success: false,
        message: 'Invalid AI response structure',
      });
    }

    // Verify estimated cost doesn't exceed budget
    if (aiResponse.estimated_cost > budget * 1.1) {
      // Allow 10% flexibility
      return res.status(400).json({
        success: false,
        message: 'Estimated cost exceeds budget',
      });
    }

    // Save to database
    await Proposal.create({
      business_type,
      budget,
      event,
      recommended_products: aiResponse.recommended_products,
      budget_allocation: aiResponse.budget_allocation,
      estimated_cost: aiResponse.estimated_cost,
      impact_summary: aiResponse.impact_summary,
    });

    res.status(200).json({
      success: true,
      message: 'Proposal generated successfully',
      data: {
        recommended_products: aiResponse.recommended_products,
        budget_allocation: aiResponse.budget_allocation,
        estimated_cost: aiResponse.estimated_cost,
        impact_summary: aiResponse.impact_summary,
      },
    });
  } catch (error) {
    console.error('Error in generateProposal:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate proposal',
    });
  }
};

// GET /api/proposals - Get all proposals
const getProposals = async (req, res) => {
  try {
    const proposals = await Proposal.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json({
      success: true,
      data: proposals,
    });
  } catch (error) {
    console.error('Error in getProposals:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch proposals',
    });
  }
};

module.exports = {
  generateProposal,
  getProposals,
};
