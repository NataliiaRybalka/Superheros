export const httpRequest = () => {
  const request = async (url = 'http://localhost:5000/', method = 'GET', body = null, headers = {}) => {
    if (body) {
      body = JSON.stringify(body);
      headers['Content-Type'] = 'application/json';
    }

    const res = await fetch(url, {method, body, headers});
    const data = await res.json();

    return data;
  }

  return { request };
}