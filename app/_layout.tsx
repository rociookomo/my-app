import React, { useState } from 'react';
import { View } from 'react-native';
import MenuManagementScreen from './screens/MenuManagementScreen';
import GuestScreen from './screens/GuestViewScreen';
import MenuDisplayScreen from './screens/MenuDisplayScreen';

const Layout: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<string>('MenuManagement');
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>(''); // Define selectedCourse state

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

  return (
    <View style={{ flex: 1 }}>
      {currentScreen === 'MenuManagement' && (
        <MenuManagementScreen
          switchScreen={switchScreen}
          addMenuItem={addMenuItem}
          selectedCourse={selectedCourse} // Pass selectedCourse
          setSelectedCourse={setSelectedCourse} // Pass setSelectedCourse
        />
      )}
      {currentScreen === 'Guest' && (
        <GuestScreen switchScreen={switchScreen} menuItems={menuItems} />
      )}
      {currentScreen === 'MenuDisplay' && (
        <MenuDisplayScreen
          route={{ params: { menuItems } }}
          onRemoveItem={onRemoveItem}
          switchScreen={switchScreen}
        />
      )}
    </View>
  );
};

export default Layout;
