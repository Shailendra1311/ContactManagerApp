import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { getAllContacts } from '../utils/storage'; // Import function to get contacts from the local database

const ContactListScreen = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const storedContacts = await getAllContacts();
        console.log('Retrieved contacts:', storedContacts);
        setContacts(storedContacts);
      } catch (error) {
        console.error('Error loading contacts:', error);
      }
    };

    loadContacts();
  }, []);

  const renderContactItem = ({ item }) => (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={() => navigation.navigate('UpdateContact', { contact: item })}
    >
      {item.photo && <Image source={{ uri: item.photo }} style={styles.contactPhoto} />}
      <Text style={styles.contactName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const navigateToAddContact = () => {
    navigation.navigate('CreateContact');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={renderContactItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity style={styles.addButton} onPress={navigateToAddContact}>
        <Text style={styles.addButtonText}>Add Contact</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  contactPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  contactName: {
    fontSize: 16,
  },
  addButton: {
    backgroundColor: 'blue',
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default ContactListScreen;
