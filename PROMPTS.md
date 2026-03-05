# AI Prompt Engineering Guide

This document explains the prompt design and engineering strategies used in Rayeva AI.

## 📝 Prompt Design Overview

Effective prompts are crucial for reliable AI outputs. This guide documents the prompt engineering practices used across all modules.

## 1️⃣ Category & Tag Generator Prompt

### Purpose
Classify e-commerce products with semantic analysis and return structured data.

### Prompt Template
```
You are an expert eco-commerce product classifier. 
Analyze the following product and return ONLY a valid JSON object.

Product Name: [PRODUCT_NAME]
Product Description: [PRODUCT_DESCRIPTION]

Return a JSON object with the following structure (no additional text, only JSON):
{
  "primary_category": "main category for this product",
  "sub_category": "specific subcategory",
  "seo_tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "sustainability_filters": ["sustainable_attribute1", "sustainable_attribute2"]
}

Ensure:
- primary_category is one of: Electronics, Clothing, Home & Garden, Beauty, Food & Beverage, Sports, Toys
- sub_category is relevant to the primary category
- seo_tags are SEO-friendly keywords
- sustainability_filters include relevant eco-friendly attributes like "organic", "recyclable", "eco-friendly", "vegan", "fair-trade", "zero-waste", "biodegradable"

Return ONLY valid JSON, nothing else.
```

### Key Features

**1. Clear Role Definition**
```
"You are an expert eco-commerce product classifier"
```
- Sets context and expertise
- Ensures understanding of domain

**2. Specific Instructions**
```
"Return ONLY valid JSON, nothing else"
```
- Prevents rambling
- Ensures parseable output
- Reduces token usage

**3. Output Format Definition**
- Provides exact JSON structure
- Shows expected fields
- Includes field descriptions

**4. Constraints**
```
"primary_category is one of: [list]"
```
- Limits output to valid categories
- Reduces hallucinations
- Ensures consistency

### Input Validation
```javascript
if (!productName || !description) {
  throw new Error("Product name and description required");
}
```

### Output Validation
```javascript
if (!response.primary_category || 
    !Array.isArray(response.seo_tags) ||
    !Array.isArray(response.sustainability_filters)) {
  throw new Error("Invalid response structure");
}
```

### Example Execution

**Input:**
```json
{
  "product_name": "Bamboo Toothbrush",
  "description": "Biodegradable bamboo toothbrush with soft bristles"
}
```

**Prompt Sent to OpenAI:**
```
You are an expert eco-commerce product classifier...
Product Name: Bamboo Toothbrush
Product Description: Biodegradable bamboo toothbrush with soft bristles
...
```

**Expected Output:**
```json
{
  "primary_category": "Personal Care",
  "sub_category": "Dental Care",
  "seo_tags": ["bamboo", "toothbrush", "eco-friendly", "biodegradable", "sustainable"],
  "sustainability_filters": ["biodegradable", "vegan", "eco-friendly", "zero-waste"]
}
```

## 2️⃣ B2B Proposal Generator Prompt

### Purpose
Generate business proposals with product recommendations and budget allocation.

### Prompt Template
```
You are an expert B2B consultant specializing in sustainable products and solutions. 
Generate a recommendation based on the client requirements.

Business Type: [BUSINESS_TYPE]
Available Budget: $[BUDGET]
Event/Purpose: [EVENT]

Return a JSON object with the following structure (no additional text, only JSON):
{
  "recommended_products": ["product1", "product2", "product3", "product4"],
  "budget_allocation": {
    "product1": 1000,
    "product2": 1500,
    "product3": 800,
    "product4": 700
  },
  "estimated_cost": 4000,
  "impact_summary": "Brief description of how these products will benefit..."
}

Ensure:
- recommended_products are 4 relevant sustainable products
- budget_allocation sums to the estimated_cost
- estimated_cost is reasonable and within the provided budget
- impact_summary is 2-3 sentences explaining business and environmental impact

Return ONLY valid JSON, nothing else.
```

### Key Features

**1. Domain Expertise**
```
"You are an expert B2B consultant specializing in sustainable products"
```
- Sets consultant persona
- Ensures business-appropriate recommendations

**2. Exact Requirements**
```
"recommended_products are 4 relevant sustainable products"
```
- Specifies quantity
- Ensures relevance
- Focuses on sustainability

**3. Mathematical Constraints**
```
"budget_allocation sums to the estimated_cost"
- estimated_cost is reasonable and within budget"
```
- Ensures budget compliance
- Prevents overspending

**4. Quality Constraints**
```
"impact_summary is 2-3 sentences"
```
- Controls output length
- Ensures conciseness
- Maintains quality

### Input Validation
```javascript
if (!businessType || !budget || !event) {
  throw new Error("All fields required");
}

if (typeof budget !== 'number' || budget <= 0) {
  throw new Error("Budget must be positive");
}
```

### Output Validation
```javascript
if (!Array.isArray(response.recommended_products) ||
    response.recommended_products.length !== 4) {
  throw new Error("Must recommend exactly 4 products");
}

if (response.estimated_cost > budget * 1.1) {
  throw new Error("Cost exceeds budget");
}

// Verify budget allocation sums
const sum = Object.values(response.budget_allocation).reduce((a, b) => a + b, 0);
if (Math.abs(sum - response.estimated_cost) > 1) {
  throw new Error("Budget allocation doesn't sum correctly");
}
```

### Example Execution

**Input:**
```json
{
  "business_type": "Coffee Shop",
  "budget": 3000,
  "event": "Go Green Initiative"
}
```

**Prompt Sent to OpenAI:**
```
You are an expert B2B consultant...
Business Type: Coffee Shop
Available Budget: $3000
Event/Purpose: Go Green Initiative
...
```

**Expected Output:**
```json
{
  "recommended_products": [
    "Reusable Coffee Cups",
    "Eco-Friendly Packaging",
    "Sustainable Sourcing Program",
    "Green Training Materials"
  ],
  "budget_allocation": {
    "Reusable Coffee Cups": 1000,
    "Eco-Friendly Packaging": 900,
    "Sustainable Sourcing Program": 700,
    "Green Training Materials": 400
  },
  "estimated_cost": 3000,
  "impact_summary": "These products will reduce waste by 80%..."
}
```

## 🎯 Prompt Engineering Best Practices

### 1. Temperature Settings

**Temperature 0.7 (Used in Rayeva AI)**
```javascript
temperature: 0.7
```
- Balanced between creativity and consistency
- Good for business logic
- Reduces hallucinations while allowing flexibility
- Optimal for classification and recommendations

**Other Values:**
- `0.0 - 0.3`: Deterministic (use for strict classification)
- `0.4 - 0.6`: Conservative (use for factual info)
- `0.8 - 1.0`: Creative (use for writing/brainstorming)

### 2. Token Optimization

```javascript
// Set appropriate max_tokens
// Too low: Response gets cut off
// Too high: Wastes tokens and cost
max_tokens: 1000  // Sufficient for our outputs

// Estimate tokens:
// 1 token ≈ 4 characters
// Prompt: ~300 tokens
// Response: ~200-400 tokens
// Total: ~500-700 tokens per request
```

### 3. Instruction Clarity

**Good Instructions:**
```
✅ Return ONLY valid JSON
✅ Include exactly 4 products
✅ Ensure budget doesn't exceed $5000
✅ Categories: Electronics, Clothing, Beauty
```

**Bad Instructions:**
```
❌ Give me some products
❌ Make it eco-friendly
❌ Don't exceed budget (too vague)
❌ Return something nice
```

### 4. Role Definition

```
✅ "You are an expert eco-commerce classifier"
✅ "You are a B2B sustainability consultant"
✅ "You are a professional product analyst"

❌ "Generate categories"
❌ "I need products"
❌ "Make a proposal"
```

### 5. Constraint Specification

```
✅ "primary_category must be one of: [list]"
✅ "Must include 4-6 products"
✅ "Response must be valid JSON only"

❌ "Choose from some categories"
❌ "Include products"
❌ "Return JSON if possible"
```

## 🔄 Iterative Improvement

### A/B Testing Prompts

```javascript
// Version 1
const promptV1 = getProposalPrompt(businessType, budget, event);

// Version 2 (with more constraints)
const promptV2 = getProposalPromptV2(businessType, budget, event);

// Track success rate and adjust
if (successRateV2 > successRateV1) {
  usePromptV2();
}
```

### Monitoring Prompt Performance

```javascript
// Log metrics
{
  prompt_version: "v1",
  success_rate: 95,
  avg_response_time: 2.3,
  token_usage: 650,
  error_rate: 5,
  hallucination_rate: 2
}
```

## 🚨 Error Handling in Prompts

### JSON Parsing Fallback

```javascript
try {
  // Try direct parse
  return JSON.parse(response);
} catch (e) {
  // Extract from markdown/code blocks
  const match = response.match(/\{[\s\S]*\}/);
  if (match) {
    return JSON.parse(match[0]);
  }
  // If still fails, throw error
  throw new Error("Invalid JSON response");
}
```

### Retry Strategy

```javascript
async function callWithRetry(prompt, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await callOpenAI(prompt);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      // Wait before retry
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }
}
```

## 📊 Cost Optimization

### Token Usage Estimation

```
Category Generator:
- Prompt: ~250 tokens
- Response: ~150 tokens
- Total: ~400 tokens
- Cost: ~$0.0006 per request (GPT-3.5-turbo)

Proposal Generator:
- Prompt: ~300 tokens
- Response: ~250 tokens
- Total: ~550 tokens
- Cost: ~$0.0008 per request

Monthly Estimate (assuming 1000 requests):
- Categories: $0.60
- Proposals: $0.80
- Total: ~$1.40/month (very cheap!)
```

### Cost-Saving Tips

1. **Use lower temperature for deterministic tasks**
   - Reduces retry rate
   - Lower error rate

2. **Limit max_tokens appropriately**
   - Don't set too high
   - Trim unnecessary output

3. **Cache similar requests**
   - Use Redis for common queries
   - Reduces API calls

4. **Batch requests** (future enhancement)
   - Process multiple items in one prompt
   - Not currently used but possible

## 🔐 Prompt Injection Prevention

### Validation Before Prompt

```javascript
// Sanitize user input
function sanitizeInput(input) {
  return input
    .trim()
    .substring(0, 500)  // Limit length
    .replace(/[^\w\s-]/g, '');  // Only safe characters
}

// Use in prompt
const prompt = `
Product Name: ${sanitizeInput(productName)}
Description: ${sanitizeInput(description)}
...
`;
```

### Escaping in Prompts

```javascript
// Escape special characters
const escapedInput = userInput
  .replace(/"/g, '\\"')
  .replace(/\n/g, '\\n')
  .replace(/\\/g, '\\\\');
```

## 📈 Future Enhancements

1. **Prompt Versioning**
   - Store multiple versions
   - A/B test different approaches
   - Track performance metrics

2. **Few-Shot Learning**
   - Include examples in prompt
   - "Here's an example: {...}"
   - Improves accuracy

3. **Chain of Thought**
   - Ask model to reason step-by-step
   - Improves complex decision making
   - Useful for impact analysis

4. **Dynamic Prompts**
   - Adjust based on input complexity
   - Different prompts for different markets
   - Personalized recommendations

---

**Prompts are the heart of AI applications** 💡
