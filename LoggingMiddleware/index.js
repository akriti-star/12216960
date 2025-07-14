const axios = require('axios');
const { isValidLog } = require('./validate');

const LOG_ENDPOINT = 'http://20.244.56.144/evaluation-service/logs';
const AUTH_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzaGFybWFha3JpdGk4Njc4QGdtYWlsLmNvbSIsImV4cCI6MTc1MjQ3NDA2OCwiaWF0IjoxNzUyNDczMTY4LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNzdhNDZhNmYtMTFkYi00NWFkLTkzYjgtOGNkODQ0MWUyNmZhIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYWtyaXRpIHNoYXJtYSIsInN1YiI6IjlmN2VkMzQyLWYxMGMtNDk5OC1hZjAxLWIyODlmNTI4MjcyZiJ9LCJlbWFpbCI6InNoYXJtYWFrcml0aTg2NzhAZ21haWwuY29tIiwibmFtZSI6ImFrcml0aSBzaGFybWEiLCJyb2xsTm8iOiIxMjIxNjk2MCIsImFjY2Vzc0NvZGUiOiJDWnlwUUsiLCJjbGllbnRJRCI6IjlmN2VkMzQyLWYxMGMtNDk5OC1hZjAxLWIyODlmNTI4MjcyZiIsImNsaWVudFNlY3JldCI6ImtWa2hYVGpaZFdDVk1QWWIifQ.BeXa6YCRVm0A09rLWytodUPrl18cwR-6WuQmogw_nF0'; // full token here

async function Log(stack, level, pkg, message) {
  if (!isValidLog(stack, level, pkg, message)) return;

  try {
    const response = await axios.post(
      LOG_ENDPOINT,
      {
        stack,
        level,
        package: pkg,
        message
      },
      {
        headers: {
          Authorization: AUTH_TOKEN,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log("✅ Log submitted:", response.data.message);
  } catch (error) {
    console.error("❌ Failed to send log:", error.message);
  }
}

module.exports = Log;
