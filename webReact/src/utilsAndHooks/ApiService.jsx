
export async function get(route, method = 'GET') {
    return await (await fetch('/api/' + route, { method }))
      .json().catch(e => ({ error: e + '' }));
  }

