// components/MenuItemCard.js
// Renders one menu item as a card. Kept as its own component so MenuList.js
// only has to worry about the list logic (search/filter/empty state), not
// the layout of an individual item.

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function MenuItemCard({ item, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.dishName}>{item.dishName}</Text>
        <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
      </View>

      <Text style={styles.course}>{item.course}</Text>
      <Text style={styles.description}>{item.description}</Text>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.editButton} onPress={() => onEdit(item)}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item)}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dishName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1b1b1b',
    flexShrink: 1,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2e7d32',
  },
  course: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2e7d32',
    marginTop: 4,
    textTransform: 'uppercase',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginTop: 6,
  },
  actionsRow: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 10,
  },
  editButton: {
    borderWidth: 1,
    borderColor: '#2e7d32',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginRight: 10,
  },
  editButtonText: {
    color: '#2e7d32',
    fontWeight: '600',
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: '#c0392b',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  deleteButtonText: {
    color: '#c0392b',
    fontWeight: '600',
  },
});
