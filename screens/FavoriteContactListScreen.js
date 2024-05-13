// screens/FavoriteContactListScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { getAllFavoriteContacts } from '../utils/storage'; // Import the function to fetch favorite contacts from the database

const FavoriteContactListScreen = ({ navigation }) => {
  const [favoriteContacts, setFavoriteContacts] = useState([]);

  useEffect(() => {
    const loadFavoriteContacts = async () => {
      try {
        // Fetch favorite contacts from the local database
        const favoriteContactsFromDB = await getAllFavoriteContacts();
        setFavoriteContacts(favoriteContactsFromDB);
      } catch (error) {
        console.error('Error loading favorite contacts:', error);
      }
    };

    loadFavoriteContacts();
  }, []);

  const renderFavoriteContactItem = ({ item }) => (
    <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <Text>{item.name}</Text>
      <Text>{item.phone}</Text>
    </View>
  );

  const navigateToContactList = () => {
    navigation.navigate('ContactList');
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <SwipeListView
        data={favoriteContacts}
        renderItem={renderFavoriteContactItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button title="Back to Contact List" onPress={navigateToContactList} />
    </View>
  );
};

export default FavoriteContactListScreen;
