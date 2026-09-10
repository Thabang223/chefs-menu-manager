// App.js
// Entry point for the Chef's Menu Manager app.
//
// State (the list of menu items) lives here and gets passed down to
// whichever screen is active. Navigation is done with simple state rather
// than a navigation library, since the brief only calls for a few screens
// and this keeps the project easy to follow.

import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
} from 'react-native';

import MenuItemForm from './components/MenuItemForm';
import MenuList from './components/MenuList';
import Statistics from './components/Statistics';

const TABS = {
  ADD: 'Add',
  MENU: 'Menu',
  STATS: 'Statistics',
};

export default function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [activeTab, setActiveTab] = useState(TABS.MENU);
  const [editingItem, setEditingItem] = useState(null); // item currently being edited, or null

  function handleAddItem(newItem) {
    const itemWithId = { ...newItem, id: Date.now().toString() };
    setMenuItems((prev) => [...prev, itemWithId]);
    Alert.alert('Success', `${newItem.dishName} was added to the menu.`);
    setActiveTab(TABS.MENU);
  }

  function handleUpdateItem(updatedItem) {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === editingItem.id ? { ...updatedItem, id: item.id } : item
      )
    );
    Alert.alert('Success', `${updatedItem.dishName} was updated.`);
    setEditingItem(null);
    setActiveTab(TABS.MENU);
  }

  function handleEditRequest(item) {
    setEditingItem(item);
    setActiveTab(TABS.ADD);
  }

  function handleDeleteRequest(item) {
    Alert.alert(
      'Delete dish',
      `Are you sure you want to delete "${item.dishName}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setMenuItems((prev) => prev.filter((i) => i.id !== item.id));
          },
        },
      ]
    );
  }

  function handleTabPress(tab) {
    // Leaving the Add tab without submitting cancels any in-progress edit.
    if (tab !== TABS.ADD) {
      setEditingItem(null);
    }
    setActiveTab(tab);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#2e7d32" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chef's Menu Manager</Text>
      </View>

      <View style={styles.content}>
        {activeTab === TABS.ADD && (
          <MenuItemForm
            initialValues={editingItem}
            submitLabel={editingItem ? 'Update Dish' : 'Add Dish'}
            onSubmit={editingItem ? handleUpdateItem : handleAddItem}
          />
        )}

        {activeTab === TABS.MENU && (
          <MenuList
            items={menuItems}
            onEdit={handleEditRequest}
            onDelete={handleDeleteRequest}
          />
        )}

        {activeTab === TABS.STATS && <Statistics items={menuItems} />}
      </View>

      <View style={styles.tabBar}>
        {Object.values(TABS).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={styles.tabButton}
            onPress={() => handleTabPress(tab)}
          >
            <Text
              style={[
                styles.tabButtonText,
                activeTab === tab && styles.tabButtonTextActive,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f6f4',
  },
  header: {
    backgroundColor: '#2e7d32',
    paddingVertical: 16,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },
  tabButtonText: {
    color: '#888',
    fontWeight: '600',
    fontSize: 13,
  },
  tabButtonTextActive: {
    color: '#2e7d32',
  },
});
