export const generatePaginationNumbers = (currentPage: number, totalPages: number) => {
  // if totalPages is seven or less, we'll show all pages without ellipsis
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1); // [1, 2, 3, 4, ...]
  }

  // if currentPage is between the first three pages, we'll show the first three pages
  // ellipsis and the last two pages
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages]; // [1, 2, 3, '...', 9, 10]
  }

  // if currentPage is between the last three pages, we'll show the first two pages
  // ellipsis and the last three pages
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages]; // [1, 2, '...', 8, 9, 10]
  }

  // if currentPage is between the first three pages and the last three pages,
  // we'll show the first page, ellipsis, the current page, and the last page
  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]; // [1, '...', 4, 5, 6, '...', 10
};