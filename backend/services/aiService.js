const { OpenAI } = require('openai');
const Logs = require('../models/Logs');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const callOpenAI = async (prompt, moduleName) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content.trim();
    let jsonResponse;

    // Try to parse JSON from response
    try {
      jsonResponse = JSON.parse(content);
    } catch (parseError) {
      // If response is wrapped in code blocks, extract JSON
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonResponse = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Invalid JSON in AI response');
      }
    }

    // Log successful response
    await Logs.create({
      module_name: moduleName,
      prompt: prompt,
      response: jsonResponse,
      status: 'success',
    });

    return jsonResponse;
  } catch (error) {
    // Log error
    await Logs.create({
      module_name: moduleName,
      prompt: prompt,
      response: {},
      status: 'error',
      error_message: error.message,
    });

    throw error;
  }
};

module.exports = {
  callOpenAI,
};
