const axios = require('axios');

const handler = async event => {
  const path = event.queryStringParameters.path;

  try {
    const github = axios.create({
      baseURL: 'https://api.github.com',
      headers: { Authorization: process.env.REACT_APP_GITHUB_TOKEN },
    });
    const res = await github.get(path);

    return {
      statusCode: 200,
      body: JSON.stringify(res.data),
    };
  } catch (error) {
    const { status, statusText, headers, data } = error.response;
    return {
      statusCode: status,
      body: JSON.stringify({ status, statusText, headers, data }),
    };
  }
};

module.exports = { handler };
