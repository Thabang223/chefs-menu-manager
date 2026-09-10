# Chef's Menu Manager

A React Native (Expo) app that lets a chef add, view, edit, delete, search,
filter, and see statistics for their menu items. Built for the IMAD5112 POE.

## Running the app

1. Install [Expo Go](https://expo.dev/client) on your phone, or set up an
   Android/iOS simulator.
2. In the project folder, install dependencies:
   ```
   npm install
   ```
3. Start the dev server:
   ```
   npm start
   ```
4. Scan the QR code with Expo Go, or press `a` / `i` to launch a simulator.

## Project structure

```
App.js                        — app state, tab navigation, add/edit/delete logic
components/
  MenuItemForm.js              — shared add/edit form with validation
  MenuItemCard.js               — single menu item display (with Edit/Delete)
  MenuList.js                   — list screen (search + filter + empty states)
  SearchFilterBar.js            — search input and course filter chips
  Statistics.js                 — total items, average price, per-course counts
utils/
  menuStats.js                  — search/filter/statistics helper functions
```

## Feature checklist

**Part 2 — core functionality**
- [x] Clear application title, consistent layout and spacing
- [x] Capture dish name, description, course, price
- [x] Add multiple items; list updates automatically
- [x] Field validation, error messages, success confirmation
- [x] "No menu items yet" message when the list is empty

**Part 3 — enhancements**
- [x] Edit an existing menu item (reuses the same form as Add)
- [x] Delete a menu item (with a confirmation prompt)
- [x] Search menu items by dish name
- [x] Filter menu items by course
- [x] Clear search/filter to show all items again
- [x] Statistics screen: total items, average price, count per course
- [x] Code split into reusable, single-purpose components
- [x] Shared logic (search/filter/stats) pulled into `utils/menuStats.js`

## Change log (since Part 2)

- Added `MenuItemCard`, `SearchFilterBar`, and `Statistics` components
- Extended `MenuItemForm` to support both "add" and "edit" modes via an
  `initialValues` prop, instead of having a separate edit form
- Added `utils/menuStats.js` for search, filter, and statistics logic
- Added a delete confirmation dialog to prevent accidental deletions
- Replaced the single-screen layout with a bottom tab bar (Add / Menu /
  Statistics) for clearer navigation between features
- Refactored inline styles into `StyleSheet.create` blocks per component for
  readability and consistency
