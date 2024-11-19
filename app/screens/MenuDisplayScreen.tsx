import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity, TextInput, Alert } from 'react-native';

interface MenuItem {
  dishName: string;
  description: string;
  course: string;
  price: number;
}

interface MenuDisplayScreenProps {
  route: {
    params: {
      menuItems: MenuItem[];
    };
  };
  onRemoveItem: (index: number) => void;
  switchScreen: (screen: string) => void;
}

const MenuDisplayScreen: React.FC<MenuDisplayScreenProps> = ({ route, onRemoveItem, switchScreen }) => {
  const { menuItems } = route.params;
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<string | null>(null);

  const totalItems = menuItems.length;
  const totalPrice = menuItems.reduce((sum, item) => sum + item.price, 0);
  const averagePrice = totalItems > 0 ? totalPrice / totalItems : 0;

  const filteredItems = menuItems
    .filter(
      (item) =>
        item.dishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortOption) return 0;
      if (sortOption === 'priceAsc') return a.price - b.price;
      if (sortOption === 'priceDesc') return b.price - a.price;
      return a.dishName.localeCompare(b.dishName); // Default: alphabetical
    });

  const clearAllItems = () => {
    Alert.alert('Clear All Items', 'Are you sure you want to remove all menu items?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Yes', onPress: () => menuItems.forEach((_, index) => onRemoveItem(index)) },
    ]);
  };

  const renderItem = ({ item, index }: { item: MenuItem; index: number }) => (
    <View style={styles.menuItem}>
      <Text style={styles.itemName}>{item.dishName}</Text>
      <Text style={styles.itemText}>Description: {item.description}</Text>
      <Text style={styles.itemText}>Course: {item.course}</Text>
      <Text style={styles.itemText}>Price: {item.price} ZAR</Text>
      <TouchableOpacity style={styles.removeButton} onPress={() => onRemoveItem(index)}>
        <Text style={styles.buttonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Menu Items</Text>
      <Text style={styles.summaryText}>Total Menu Items: {totalItems}</Text>
      <Text style={styles.summaryText}>Total Price: {totalPrice.toFixed(2)} ZAR</Text>
      <Text style={styles.summaryText}>Average Price: {averagePrice.toFixed(2)} ZAR</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search menu items..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor="#ffb3b3"
      />

      {/* Sorting Options */}
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort By:</Text>
        <Button title="Price (Low-High)" onPress={() => setSortOption('priceAsc')} color="#ff80bf" />
        <Button title="Price (High-Low)" onPress={() => setSortOption('priceDesc')} color="#ff80bf" />
        <Button title="Alphabetical" onPress={() => setSortOption('alphabetical')} color="#ff80bf" />
      </View>

      {/* Menu Items List */}
      {filteredItems.length > 0 ? (
        <FlatList
          data={filteredItems}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={styles.emptyStateText}>No menu items found. Try adjusting your search or filters!</Text>
      )}

      {/* Navigation Buttons */}
      <View style={styles.navigationButtons}>
        <Button title="Add Menu Item" color="#ff80bf" onPress={() => switchScreen('MenuManagement')} />
        <Button title="Guest Menu" color="#ff80bf" onPress={() => switchScreen('Guest')} />
        <Button title="Clear All" color="#ff6666" onPress={clearAllItems} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffe6f2',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ff66a3',
    textAlign: 'center',
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ff66a3',
    textAlign: 'center',
    marginBottom: 15,
  },
  menuItem: {
    backgroundColor: '#fff0f5',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#ff3399',
    marginBottom: 5,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    marginVertical: 2,
  },
  removeButton: {
    backgroundColor: '#ff6666',
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  searchBar: {
    height: 40,
    borderColor: '#ff99cc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    color: '#ff66a3',
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  sortLabel: {
    fontSize: 16,
    color: '#ff66a3',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default MenuDisplayScreen;
