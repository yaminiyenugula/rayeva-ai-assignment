const getCategoryPrompt = (productName, description) => {
  return `You are an expert eco-commerce product classifier. Analyze the following product and return ONLY a valid JSON object.

Product Name: ${productName}
Product Description: ${description}

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

Return ONLY valid JSON, nothing else.`;
};

module.exports = getCategoryPrompt;
