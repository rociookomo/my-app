import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';

interface MenuItem {
  dishName: string;
  description: string;
  course: string;
  price: number;
}

interface GuestScreenProps {
  switchScreen: (screen: string) => void;
  menuItems: MenuItem[]; // Imported menu items from MenuManagementScreen
}

const GuestScreen: React.FC<GuestScreenProps> = ({ switchScreen, menuItems }) => {
  // Hardcoded menu items
  const hardcodedItems: MenuItem[] = [
    { dishName: 'Caesar Salad', description: 'Romaine lettuce with Caesar dressing', course: 'Starter', price: 50 },
    { dishName: 'Grilled Chicken', description: 'Chicken breast with herbs', course: 'Main', price: 120 },
    { dishName: 'Chocolate Cake', description: 'Rich chocolate dessert', course: 'Dessert', price: 70 },
  ];

  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  // Combine hardcoded items and menu items from MenuManagementScreen
  const combinedMenuItems = [...hardcodedItems, ...menuItems];

  // Filter menu items based on selected course
  const filteredItems = selectedCourse
    ? combinedMenuItems.filter((item) => item.course === selectedCourse)
    : combinedMenuItems;

  // Render function for each menu item
  const renderItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.menuItem}>
      <Text style={styles.itemName}>{item.dishName}</Text>
      <Text>{item.description}</Text>
      <Text>Course: {item.course}</Text>
      <Text>Price: {item.price} ZAR</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Welcome to the Guest Menu!</Text>
      </View>
      
      {/* Course filter buttons with icons */}
      <View style={styles.filterButtons}>
        {['All', 'Starter', 'Main', 'Dessert'].map((course) => (
          <TouchableOpacity
            key={course}
            style={[
              styles.filterButton,
              selectedCourse === course || (course === 'All' && selectedCourse === null)
                ? styles.selectedButton
                : null,
            ]}
            onPress={() => setSelectedCourse(course === 'All' ? null : course)}
          >
            {/* Placeholder icons */}
            <Text style={styles.icon}>{course === 'Starter' ? '🍜' : course === 'Main' ? '🍲' : course === 'Dessert' ? '🍰' : '📋'}</Text>
            <Text style={styles.buttonText}>{course}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Menu item list */}
      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Back to Menu Management button */}
      <Button title="Back to Menu Management" onPress={() => switchScreen('MenuManagement')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffe6f2',
  },
  banner: {
    backgroundColor: '#ffccdd',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  bannerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff6699',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#ff6699',
  },
  menuItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#ff6699',
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#ff99cc',
    alignItems: 'center',
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selectedButton: {
    backgroundColor: '#ff6699',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  icon: {
    fontSize: 18,
  },
});

export default GuestScreen;
