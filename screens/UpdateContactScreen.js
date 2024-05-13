// UpdateContactScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { updateContact, deleteContact } from '../utils/storage'; // Import the database functions

const UpdateContactScreen = ({ route, navigation }) => {
  const { contact } = route.params;
  const [name, setName] = useState(contact.name);
  const [phone, setPhone] = useState(contact.phone);

  const handleUpdateContact = async () => {
    try {
      const updatedContact = { ...contact, name, phone };
      await updateContact(updatedContact); // Update contact using database function
      navigation.goBack();
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const handleDeleteContact = async () => {
    try {
      await deleteContact(contact.id); // Delete contact using database function
      navigation.goBack();
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Name:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
        onChangeText={setName}
        value={name}
      />
      <Text>Phone:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
        onChangeText={setPhone}
        value={phone}
        keyboardType="numeric"
      />
      <Button title="Update Contact" onPress={handleUpdateContact} />
      <Button title="Delete Contact" onPress={handleDeleteContact} />
    </View>
  );
};

export default UpdateContactScreen;
