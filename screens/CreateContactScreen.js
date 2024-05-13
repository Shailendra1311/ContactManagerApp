import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { saveContact } from '../utils/storage'; // Import the saveContact function from the database module

const CreateContactScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSaveContact = async () => {
    try {
      // Validate input fields
      if (!name.trim() || !phone.trim()) {
        console.error('Name and phone number are required.');
        return;
      }

      // Create a new contact object
      const newContact = {
        id: Date.now().toString(),
        name,
        phone,
      };

      // Save the new contact using the saveContact function from the database module
      const success = await saveContact(newContact);
      if (success) {
        // Navigate back to the contact list screen
        navigation.navigate('ContactList');
      } else {
        console.error('Failed to save contact.');
      }
    } catch (error) {
      console.error('Error saving contact:', error);
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
      <Button title="Save Contact" onPress={handleSaveContact} />
    </View>
  );
};

export default CreateContactScreen;
