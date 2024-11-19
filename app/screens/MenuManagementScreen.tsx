import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';

interface MenuItem {
  dishName: string;
  description: string;
  course: string;
  price: number;
}

interface MenuManagementScreenProps {
  switchScreen: (screen: string) => void;
  addMenuItem: (item: MenuItem) => void;
  selectedCourse: string;
  setSelectedCourse: React.Dispatch<React.SetStateAction<string>>;
}

const MenuManagementScreen: React.FC<MenuManagementScreenProps> = ({
  switchScreen,
  addMenuItem,
  selectedCourse,
  setSelectedCourse,
}) => {
  const [dishName, setDishName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [recentItems, setRecentItems] = useState<MenuItem[]>([]);

  const addItem = () => {
    if (!dishName || !/^[A-Za-z\s]+$/.test(dishName)) {
      setErrorMessage('Dish name must contain only text.');
      return;
    }
    if (!description || !/^[A-Za-z\s]+$/.test(description)) {
      setErrorMessage('Description must contain only text.');
      return;
    }
    if (!price || isNaN(Number(price))) {
      setErrorMessage('Price must be a number.');
      return;
    }
    if (!selectedCourse) {
      setErrorMessage('Please select a course (Starter, Main, or Dessert).');
      return;
    }

    setErrorMessage('');

    const newItem: MenuItem = {
      dishName,
      description,
      course: selectedCourse,
      price: parseFloat(price),
    };

    addMenuItem(newItem);

    // Update recent items
    setRecentItems((prevItems) => [newItem, ...prevItems].slice(0, 5));

    clearInputs();
  };

  const clearInputs = () => {
    setDishName('');
    setDescription('');
    setPrice('');
    setSelectedCourse('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manage Menu</Text>

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        value={dishName}
        onChangeText={setDishName}
        placeholderTextColor="#ffb3b3"
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        placeholderTextColor="#ffb3b3"
      />
      <TextInput
        style={styles.input}
        placeholder="Price (ZAR)"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
        placeholderTextColor="#ffb3b3"
      />

      <View style={styles.buttonContainer}>
        <Text style={styles.subHeader}>Select Course:</Text>
        <TouchableOpacity
          style={[styles.courseButton, selectedCourse === 'Starter' && styles.activeButton]}
          onPress={() => setSelectedCourse('Starter')}
        >
          <Text style={styles.buttonText}>Starter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.courseButton, selectedCourse === 'Main' && styles.activeButton]}
          onPress={() => setSelectedCourse('Main')}
        >
          <Text style={styles.buttonText}>Main</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.courseButton, selectedCourse === 'Dessert' && styles.activeButton]}
          onPress={() => setSelectedCourse('Dessert')}
        >
          <Text style={styles.buttonText}>Dessert</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={addItem}>
        <Text style={styles.addButtonText}>Add Menu Item</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.displayButton} onPress={() => switchScreen('MenuDisplay')}>
        <Text style={styles.displayButtonText}>Go to Menu Display</Text>
      </TouchableOpacity>

      <FlatList
        data={recentItems}
        renderItem={({ item }) => (
          <View style={styles.recentItem}>
            <Text style={styles.recentText}>
              {item.dishName} ({item.course}) - {item.price} ZAR
            </Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          recentItems.length > 0 ? (
            <Text style={styles.recentHeader}>Recently Added Items:</Text>
          ) : null
        }
      />
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
    fontSize: 30,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#d147a3',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 18,
    color: '#ff66b2',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ff66b2',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    color: '#d147a3',
    backgroundColor: '#ffe6f2',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    marginTop: 10,
  },
  courseButton: {
    padding: 10,
    backgroundColor: '#ff99cc',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ff66b2',
  },
  activeButton: {
    backgroundColor: '#ff66b2',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#ff66b2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  displayButton: {
    backgroundColor: '#ff99cc',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  displayButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  recentHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d147a3',
    marginBottom: 10,
    textAlign: 'center',
  },
  recentItem: {
    backgroundColor: '#fff0f5',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  recentText: {
    fontSize: 16,
    color: '#d147a3',
  },
});

export default MenuManagementScreen;
