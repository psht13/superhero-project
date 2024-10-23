export const calculatePaginationData = (totalItems, perPage, page) => {
  const totalPages = Math.ceil(totalItems / perPage);
  const hasNextPage = Boolean(totalPages - page);
  const hasPreviousPage = page > 1;

  return {
    totalItems,
    page,
    perPage,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };
};
