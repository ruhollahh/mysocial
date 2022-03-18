function getPagination({ limit = 0, page = 1 } = {}) {
  const skip = (Math.abs(page) - 1) * Math.abs(limit);

  return {
    skip,
    limit,
  };
}

export { getPagination };
