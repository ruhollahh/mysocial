function linkify(url) {
  if (url.substring(0, 4) !== 'http') {
    return `https://${url}`;
  }
  return url;
}

export { linkify };
