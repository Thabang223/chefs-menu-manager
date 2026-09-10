// utils/menuStats.js
// Small helper functions used across the app. Keeping these separate from
// the components means the same logic can be reused and tested on its own,
// and it keeps MenuList.js and Statistics.js from getting cluttered.

export const COURSES = ['Starter', 'Main Course', 'Dessert'];

// Returns only the items whose dish name contains the search text
// (case-insensitive). An empty search term returns everything.
export function searchMenuItems(items, searchTerm) {
  if (!searchTerm.trim()) return items;
  const term = searchTerm.trim().toLowerCase();
  return items.filter((item) => item.dishName.toLowerCase().includes(term));
}

// Returns only the items that match the selected course.
// A course of null/'' means "no filter applied", so everything is returned.
export function filterByCourse(items, course) {
  if (!course) return items;
  return items.filter((item) => item.course === course);
}

// Combines search + filter in one call so screens don't have to chain them.
export function applySearchAndFilter(items, searchTerm, course) {
  return filterByCourse(searchMenuItems(items, searchTerm), course);
}

// Builds the statistics summary shown on the Statistics screen.
export function calculateStatistics(items) {
  const totalItems = items.length;

  const averagePrice =
    totalItems === 0
      ? 0
      : items.reduce((sum, item) => sum + Number(item.price), 0) / totalItems;

  const countPerCourse = COURSES.reduce((counts, course) => {
    counts[course] = items.filter((item) => item.course === course).length;
    return counts;
  }, {});

  return { totalItems, averagePrice, countPerCourse };
}
