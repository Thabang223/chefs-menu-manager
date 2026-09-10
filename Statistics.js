// components/Statistics.js
// Gives the chef a quick overview of the whole menu: total dishes, average
// price, and how many dishes fall under each course.

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { calculateStatistics, COURSES } from '../utils/menuStats';

export default function Statistics({ items }) {
  const { totalItems, averagePrice, countPerCourse } = calculateStatistics(items);

  if (totalItems === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>
          Add some menu items to see statistics here.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.summaryCard}>
        <View style={styles.summaryBlock}>
          <Text style={styles.summaryValue}>{totalItems}</Text>
          <Text style={styles.summaryLabel}>Total Items</Text>
        </View>
        <View style={styles.summaryBlock}>
          <Text style={styles.summaryValue}>R{averagePrice.toFixed(2)}</Text>
          <Text style={styles.summaryLabel}>Average Price</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Items per Course</Text>
      {COURSES.map((course) => (
        <View key={course} style={styles.courseRow}>
          <Text style={styles.courseName}>{course}</Text>
          <Text style={styles.courseCount}>{countPerCourse[course]}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#777',
    fontSize: 15,
    marginTop: 40,
  },
  summaryCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#2e7d32',
    borderRadius: 12,
    paddingVertical: 20,
    marginBottom: 20,
  },
  summaryBlock: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#e0f0e0',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  courseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 8,
  },
  courseName: {
    fontSize: 14,
    color: '#333',
  },
  courseCount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2e7d32',
  },
});
