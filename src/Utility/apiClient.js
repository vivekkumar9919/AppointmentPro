// apiClient.js
export async function callApi({ url, method = 'GET', body = null, headers = {} }) {
    const config = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };
  
    if (body) {
      config.body = JSON.stringify(body);
    }
  
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
  
    return response.json();
  }
  