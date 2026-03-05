const express = require('express');
const {
  generateProposal,
  getProposals,
} = require('../controllers/proposalController');

const router = express.Router();

router.post('/generate-proposal', generateProposal);
router.get('/proposals', getProposals);

module.exports = router;
