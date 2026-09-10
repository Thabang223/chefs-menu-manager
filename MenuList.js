// components/MenuList.js
// The "view all menu items" screen. Combines the search/filter bar with a
// FlatList of MenuItemCards, and shows a friendly message when there's
// nothing to display (either because no dishes exist yet, or because the
// current search/filter doesn't match anything).

import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import MenuItemCard from './MenuItemCard';
import SearchFilterBar from './SearchFilterBar';
import { applySearchAndFilter } from '../utils/menuStats';

export default function MenuList({ items, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);

  const visibleItems = useMemo(
    () => applySearchAndFilter(items, searchTerm, selectedCourse),
    [items, searchTerm, selectedCourse]
  );

  function renderEmptyState() {
    if (items.length === 0) {
      return (
        <Text style={styles.emptyText}>
          No menu items yet. Add your first dish to get started!
        </Text>
      );
    }
    return (
      <Text style={styles.emptyText}>
        No dishes match your search or filter.
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <SearchFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCourse={selectedCourse}
        onCourseChange={setSelectedCourse}
      />

      <FlatList
        data={visibleItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <MenuItemCard item={item} onEdit={onEdit} onDelete={onDelete} />
        )}
        ListEmptyComponent={renderEmptyState}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    flexGrow: 1,
  },
  emptyText: {
    textAlign: 'center',
    color: '#777',
    fontSize: 15,
    marginTop: 40,
    paddingHorizontal: 20,
  },
});
