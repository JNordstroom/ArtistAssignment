export async function get(route, method = 'GET') {
    return await (await fetch('/api/' + route, { method}))
      .json().catch(e => ({ error: e + '' }));
  }

  export async function post(route, body, method = 'POST') {
    try {
      const response = await fetch('/api/' + route, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      return { error: error.message || 'An error occurred during the request.' };
    }
  }