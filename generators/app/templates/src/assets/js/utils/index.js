export function isJson(req) {
  const str = req.headers['Content-Type'] || req.headers['content-type'] || '';
  const contentType = str.split(';')[0];
  return contentType === 'application/json';
}
