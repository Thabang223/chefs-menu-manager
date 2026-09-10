// components/SearchFilterBar.js
// Search box + course filter chips + a "clear" action, all in one bar.
// Pulled out of MenuList.js so that component only handles rendering the list.

import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COURSES } from '../utils/menuStats';

export default function SearchFilterBar({
  searchTerm,
  onSearchChange,
  selectedCourse,
  onCourseChange,
}) {
  const hasActiveFilter = searchTerm.trim() !== '' || selectedCourse !== null;

  function handleClear() {
    onSearchChange('');
    onCourseChange(null);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by dish name..."
        value={searchTerm}
        onChangeText={onSearchChange}
      />

      <View style={styles.filterRow}>
        {COURSES.map((course) => (
          <TouchableOpacity
            key={course}
            style={[
              styles.filterChip,
              selectedCourse === course && styles.filterChipActive,
            ]}
            onPress={() =>
              onCourseChange(selectedCourse === course ? null : course)
            }
          >
            <Text
              style={[
                styles.filterChipText,
                selectedCourse === course && styles.filterChipTextActive,
              ]}
            >
              {course}
            </Text>
          </TouchableOpacity>
        ))}

        {hasActiveFilter && (
          <TouchableOpacity style={styles.clearChip} onPress={handleClear}>
            <Text style={styles.clearChipText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#d0d0d0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: '#fff',
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  filterChip: {
    borderWidth: 1,
    borderColor: '#2e7d32',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  filterChipActive: {
    backgroundColor: '#2e7d32',
  },
  filterChipText: {
    color: '#2e7d32',
    fontSize: 13,
    fontWeight: '600',
  },
  filterChipTextActive: {
    color: '#fff',
  },
  clearChip: {
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginBottom: 8,
    backgroundColor: '#eee',
  },
  clearChipText: {
    color: '#555',
    fontSize: 13,
    fontWeight: '600',
  },
});
