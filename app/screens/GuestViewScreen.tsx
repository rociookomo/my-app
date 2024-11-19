import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

interface MenuItem {
  dishName: string;
  description: string;
  course: string;
  price: number;
}

interface GuestScreenProps {
  menuItems: MenuItem[]; // Imported menu items from MenuManagementScreen
}

const GuestScreen: React.FC<GuestScreenProps> = ({ menuItems }) => {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);

  // Filter and sort items based on user input
  const filteredItems = menuItems
    .filter((item) => {
      const matchesCourse = selectedCourse ? item.course === selectedCourse : true;
      const matchesSearch =
        item.dishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCourse && matchesSearch;
    })
    .sort((a, b) => {
      if (!sortOrder) return 0;
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    });

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

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search menu items..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor="#ffb3b3"
      />

      {/* Course Filter Buttons */}
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
            <Text style={styles.icon}>
              {course === 'Starter' ? '🍜' : course === 'Main' ? '🍲' : course === 'Dessert' ? '🍰' : '📋'}
            </Text>
            <Text style={styles.buttonText}>{course}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Sort Options */}
      <View style={styles.sortContainer}>
        <Text style={styles.sortText}>Sort by Price:</Text>
        <Button title="Ascending" onPress={() => setSortOrder('asc')} />
        <Button title="Descending" onPress={() => setSortOrder('desc')} />
      </View>

      {/* Menu List */}
      {filteredItems.length > 0 ? (
        <FlatList
          data={filteredItems}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={styles.emptyStateText}>No menu items match your criteria. Try adjusting filters or searching!</Text>
      )}
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
  searchBar: {
    height: 40,
    borderColor: '#ff99cc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
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
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  sortText: {
    fontSize: 16,
    color: '#ff6699',
    fontWeight: 'bold',
  },
  emptyStateText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default GuestScreen;
