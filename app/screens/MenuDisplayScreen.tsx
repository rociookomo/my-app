import React from 'react';
import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity } from 'react-native';

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

  const totalItems = menuItems.length;
  const averagePrice =
    totalItems > 0
      ? menuItems.reduce((sum, item) => sum + item.price, 0) / totalItems
      : 0;

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
      <Text style={styles.summaryText}>Average Price: {averagePrice.toFixed(2)} ZAR</Text>

      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

      <View style={styles.navigationButtons}>
        <Button title="Add Menu Item" color="#ff80bf" onPress={() => switchScreen('MenuManagement')} />
        <Button title="Guest Menu" color="#ff80bf" onPress={() => switchScreen('Guest')} />
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
});

export default MenuDisplayScreen;
