import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Button } from 'react-native';
import MenuManagementScreen from './screens/MenuManagementScreen';
import GuestScreen from './screens/GuestViewScreen';
import MenuDisplayScreen from './screens/MenuDisplayScreen';

const Layout: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<string>('Home');
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [lastRole, setLastRole] = useState<string | null>(null);

  // Function to switch screens
  const switchScreen = (screen: string) => {
    setCurrentScreen(screen);
  };

  // Function to add a menu item
  const addMenuItem = (item: any) => {
    setMenuItems([...menuItems, item]);
  };

  // Function to remove a menu item
  const onRemoveItem = (index: number) => {
    const updatedMenuItems = menuItems.filter((_, i) => i !== index);
    setMenuItems(updatedMenuItems);
  };

  // Function to log out
  const logout = () => {
    setCurrentScreen('Home');
    setLastRole(null);
  };

  // Generate random daily special or a message
  const getDailySpecial = () => {
    if (menuItems.length > 0) {
      const randomIndex = Math.floor(Math.random() * menuItems.length);
      return `Today's Special: ${menuItems[randomIndex].dishName} - ${menuItems[randomIndex].description} (${menuItems[randomIndex].price} ZAR)`;
    }
    return 'Welcome! Explore our menu and enjoy your culinary journey!';
  };

  // Home Screen Component
  const HomeScreen = () => (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to the Menu App</Text>
      {lastRole && (
        <Text style={styles.greeting}>
          Hello again, {lastRole === 'Chef' ? 'Chef!' : 'Guest!'}
        </Text>
      )}
      <Text style={styles.dailySpecial}>{getDailySpecial()}</Text>
      <Text style={styles.subHeader}>Choose Your Role</Text>
      <Text style={styles.roleDescription}>
        Chef: Manage the menu by adding or removing items.
      </Text>
      <Text style={styles.roleDescription}>
        Guest: View and filter the menu as a customer.
      </Text>
      <TouchableOpacity
        style={styles.chefButton}
        onPress={() => {
          setLastRole('Chef');
          switchScreen('MenuManagement');
        }}
      >
        <Text style={styles.buttonText}>Enter as Chef</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.guestButton}
        onPress={() => {
          setLastRole('Guest');
          switchScreen('Guest');
        }}
      >
        <Text style={styles.buttonText}>Enter as Guest</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {currentScreen === 'Home' && <HomeScreen />}
      {currentScreen === 'MenuManagement' && (
        <View style={{ flex: 1 }}>
          <MenuManagementScreen
            switchScreen={switchScreen}
            addMenuItem={addMenuItem}
            selectedCourse={selectedCourse}
            setSelectedCourse={setSelectedCourse}
          />
          <View style={styles.logoutButton}>
            <Button title="Logout" onPress={logout} color="#d147a3" />
          </View>
        </View>
      )}
      {currentScreen === 'Guest' && (
        <View style={{ flex: 1 }}>
          <GuestScreen switchScreen={switchScreen} menuItems={menuItems} />
          <View style={styles.logoutButton}>
            <Button title="Logout" onPress={logout} color="#d147a3" />
          </View>
        </View>
      )}
      {currentScreen === 'MenuDisplay' && (
        <View style={{ flex: 1 }}>
          <MenuDisplayScreen
            route={{ params: { menuItems } }}
            onRemoveItem={onRemoveItem}
            switchScreen={switchScreen}
          />
          <View style={styles.logoutButton}>
            <Button title="Logout" onPress={logout} color="#d147a3" />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffe6f2',
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#d147a3',
    marginBottom: 20,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 20,
    color: '#ff66b2',
    marginBottom: 30,
    textAlign: 'center',
  },
  roleDescription: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
    textAlign: 'center',
  },
  chefButton: {
    backgroundColor: '#ff66b2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    width: '80%',
  },
  guestButton: {
    backgroundColor: '#ff99cc',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  greeting: {
    fontSize: 18,
    color: '#d147a3',
    marginBottom: 20,
    textAlign: 'center',
  },
  dailySpecial: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d147a3',
    textAlign: 'center',
    marginBottom: 20,
  },
  logoutButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default Layout;
