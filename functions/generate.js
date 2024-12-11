// functions/generate.js
const axios = require('axios');

exports.handler = async (event) => {
  // Handle preflight OPTIONS request (for CORS)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': 'https://your-frontend-domain.com', // Replace with your actual front-end domain
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: '',
    };
  }

  // Allow only POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': 'https://your-frontend-domain.com', // Replace with your actual front-end domain
      },
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const { prompt } = JSON.parse(event.body);
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key is not configured.');
    }

    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4', // Ensure you have access to this model
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
    });

    const text = response.data.choices[0].message.content;

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': 'https://your-frontend-domain.com', // Replace with your actual front-end domain
      },
      body: JSON.stringify({ text }),
    };
  } catch (error) {
    console.error('Error in generate function:', error.response ? error.response.data : error.message);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': 'https://your-frontend-domain.com', // Replace with your actual front-end domain
      },
      body: JSON.stringify({ error: 'Error generating text' }),
    };
  }
};
